import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGO_NAME || 'servicing';
const COLL_NAME = 'email_drip_queue';

let client: MongoClient | null = null;

async function getCollection() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db(DB_NAME).collection(COLL_NAME);
}

export interface DripEntry {
  _id?: ObjectId;
  email: string;
  name: string;
  source: 'early_access' | 'newsletter' | 'signup';
  enqueued_at: Date;
  emails_sent: Array<{ email_id: number; sent_at: Date }>;
  mailgun_message_ids: string[];
  unsubscribed: boolean;
}

export interface EmailTemplate {
  id: number;
  subject: string;
  preview_text: string;
  send_after_days: number;
}

export async function enqueueDripUser(email: string, name: string, source: DripEntry['source']): Promise<void> {
  const coll = await getCollection();
  const existing = await coll.findOne({ email });
  if (existing) return; // already in queue

  await coll.insertOne({
    email,
    name,
    source,
    enqueued_at: new Date(),
    emails_sent: [],
    mailgun_message_ids: [],
    unsubscribed: false,
  });
}

export async function getDueEntries(email_id: number, limit = 50): Promise<DripEntry[]> {
  const coll = await getCollection();
  const now = new Date();

  // Find entries where this email is due (send_after_days passed since enqueued_at or last sent)
  const entries = await coll.find({
    unsubscribed: false,
    $or: [
      { emails_sent: { $size: 0 } },
      // More complex logic handled below with aggregation
    ],
  }).limit(limit * 3).toArray();

  // Filter to those whose next email is due
  return (entries as DripEntry[]).filter(entry => {
    const sentIds = entry.emails_sent.map(e => e.email_id);
    if (sentIds.includes(email_id)) return false;

    if (entry.emails_sent.length === 0) {
      // First email — welcome is immediate, others have delay
      return email_id === 1; // welcome
    }

    const lastSent = entry.emails_sent[entry.emails_sent.length - 1];
    const lastSentAt = new Date(lastSent.sent_at);
    const daysSince = Math.floor((now.getTime() - lastSentAt.getTime()) / (1000 * 60 * 60 * 24));
    const dueAfterDays = [0, 2, 4, 7][email_id - 1] ?? 7;
    return daysSince >= dueAfterDays;
  }).slice(0, limit);
}

export async function markEmailSent(email: string, email_id: number, message_id: string): Promise<void> {
  const coll = await getCollection();
  await coll.updateOne(
    { email },
    {
      $push: {
        emails_sent: { email_id, sent_at: new Date() },
        mailgun_message_ids: message_id,
      },
    } as Parameters<typeof coll.updateOne>[2]
  );
}

export async function isUnsubscribed(email: string): Promise<boolean> {
  const coll = await getCollection();
  const entry = await coll.findOne({ email }, { projection: { unsubscribed: 1 } });
  return entry?.unsubscribed ?? false;
}
