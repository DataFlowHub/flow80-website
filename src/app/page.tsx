import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/translations';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
