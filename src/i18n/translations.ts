export type Locale = 'en' | 'da' | 'sv';

export const locales: Locale[] = ['en', 'da', 'sv'];
export const defaultLocale: Locale = 'en';

export type Translations = {
  nav: {
    howItWorks: string;
    pricing: string;
    getEarlyAccess: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustBadge1: string;
    trustBadge2: string;
    trustBadge3: string;
  };
  problem: {
    sectionTitle: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    card3Title: string;
    card3Text: string;
    closingText: string;
    closingBold: string;
  };
  whatsComing: {
    sectionTitle: string;
    cards: {
      badge: string;
      name: string;
      description: string;
    }[];
  };
  pricingTeaser: {
    sectionTitle: string;
    leadIn: string;
    pricePreview: string;
    noCreditCard: string;
    earlyAccessHeading: string;
    earlyAccessBody: string;
    ctaPrimary: string;
  };
  newsletter: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitLabel: string;
    privacyNote: string;
    successHeading: string;
    successBody: string;
    errorRequired: string;
    errorInvalidEmail: string;
    errorGeneric: string;
    sending: string;
  };
  earlyAccess: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    challengeLabel: string;
    challengePlaceholder: string;
    submitLabel: string;
    trustNote: string;
    successHeading: string;
    successBody: string;
    errorRequired: string;
    errorInvalidEmail: string;
    errorGeneric: string;
    sending: string;
  };
  footer: {
    tagline: string;
    links: {
      about: string;
      howItWorks: string;
      pricing: string;
      privacy: string;
      terms: string;
    };
    badges: {
      gdpr: string;
      denmark: string;
      secure: string;
    };
    copyright: string;
    ctaStripHeadline: string;
    ctaStripCta: string;
  };
  meta: {
    en: { title: string; description: string };
    da: { title: string; description: string };
    sv: { title: string; description: string };
  };
};

const en: Translations = {
  nav: {
    howItWorks: 'How It Works',
    pricing: 'Pricing',
    getEarlyAccess: 'Get Early Access →',
  },
  hero: {
    headline: 'Your team runs on manual work. We fix that.',
    subheadline:
      'Flow80 connects your systems and automates your operations — no developers needed, no complicated setup. Get started in minutes, not months.',
    ctaPrimary: 'Get Early Access →',
    ctaSecondary: 'See How It Works ↓',
    trustBadge1: 'Built in Denmark',
    trustBadge2: 'GDPR Compliant',
    trustBadge3: 'Secure by design',
  },
  problem: {
    sectionTitle: 'Still doing everything manually?',
    card1Title: 'Your systems don\'t talk to each other',
    card1Text:
      'Every ops team has the same problem. Your systems don\'t talk to each other. Your people spend hours every week copying data from one place to another.',
    card2Title: 'Things get missed. Errors slip through.',
    card2Text:
      'Things get missed. Errors slip through. And every time something new needs to be automated, you\'re either waiting on IT or paying an agency.',
    card3Title: 'The tools don\'t actually work',
    card3Text:
      'You\'ve tried the tools. The "no-code" builders either can\'t do what you actually need, or they break the moment something goes wrong. You end up babysitting them anyway.',
    closingText:
      'Flow80 is different. It\'s built for real operations work — the kind that actually matters in your business. It connects to the systems you already use, handles the logic, and runs reliably without you watching it.',
    closingBold: 'You set it up once. It works. You move on.',
  },
  whatsComing: {
    sectionTitle: 'What you\'ll be able to do',
    cards: [
      {
        badge: 'Feature Preview',
        name: 'Drag. Click. Done.',
        description:
          'Build automated workflows without writing a single line of code. Connect your systems, define the steps, and let Flow80 handle the rest. If you\'ve ever used a flowchart tool, you can build a workflow in Flow80.',
      },
      {
        badge: 'Feature Preview',
        name: 'Start from something that already works.',
        description:
          'Not sure where to begin? Choose from a library of proven workflow templates for common ops tasks — order processing, data syncing, notifications, and more. Tweak to fit, don\'t build from scratch.',
      },
      {
        badge: 'Feature Preview',
        name: 'Always know what\'s running.',
        description:
          'See every workflow run as it happens. Know exactly what data moved, what succeeded, and what needs attention — before it becomes a problem. No surprises.',
      },
      {
        badge: 'Feature Preview',
        name: 'It handles the edge cases so you don\'t have to.',
        description:
          'When something unexpected happens — a system is down, data is missing, a step fails — Flow80 doesn\'t just stop. It logs the issue, retries intelligently, and alerts you only when human input is actually needed.',
      },
    ],
  },
  pricingTeaser: {
    sectionTitle: 'Pricing. (We kept it simple.)',
    leadIn: 'One flat price. No per-user fees. No per-execution charges. No complicated tiers to decode.',
    pricePreview: 'Coming soon: €149/month — everything included',
    noCreditCard: '✦ No credit card required to join the waitlist.',
    earlyAccessHeading: 'Early access members get locked in at an exclusive rate.',
    earlyAccessBody: "You'll be the first to know when we open the doors.",
    ctaPrimary: 'Request Early Access →',
  },
  newsletter: {
    heading: 'Stay in the loop.',
    subheading: 'Be the first to know when we launch — and get early access before anyone else.',
    nameLabel: 'Your name',
    namePlaceholder: 'Marie Hansen',
    emailLabel: 'Work email address',
    emailPlaceholder: 'marie@company.dk',
    submitLabel: 'Notify Me →',
    privacyNote: "We don't spam. Unsubscribe anytime.",
    successHeading: "You're on the list.",
    successBody: "We'll email you as soon as Flow80 is ready — and you'll get early access before we open to the public.",
    errorRequired: 'This field is required',
    errorInvalidEmail: 'Please enter a valid email address',
    errorGeneric: 'Something went wrong. Please try again or email us at hello@flow80.com',
    sending: 'Sending...',
  },
  earlyAccess: {
    heading: 'Want to go first?',
    subheading: 'Apply for early access and get Flow80 before the public launch. Spots are limited.',
    nameLabel: 'Your name',
    namePlaceholder: 'Thomas Jensen',
    emailLabel: 'Work email address',
    emailPlaceholder: 'thomas@opscompany.dk',
    companyLabel: 'Company name',
    companyPlaceholder: 'Acme Logistics',
    challengeLabel: 'Biggest automation challenge',
    challengePlaceholder: 'Tell us briefly what you need (optional)',
    submitLabel: 'Request Early Access →',
    trustNote: "We'll review your application and be in touch personally. No sales calls. No pressure.",
    successHeading: "You're on the list.",
    successBody: "We'll review your application and be in touch personally. Keep doing what you're doing — we'll send details when your spot is ready.",
    errorRequired: 'This field is required',
    errorInvalidEmail: 'Please enter a valid email address',
    errorGeneric: 'Something went wrong. Please try again or email us at hello@flow80.com',
    sending: 'Sending...',
  },
  footer: {
    tagline: 'Built for ops teams who are tired of manual work.',
    links: {
      about: 'About',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    badges: {
      gdpr: 'GDPR Compliant',
      denmark: 'Built in Denmark',
      secure: 'Secure by design',
    },
    copyright: '© 2026 Flow80. All rights reserved.',
    ctaStripHeadline: 'Flow80 — Automate your operations without writing code.',
    ctaStripCta: 'Request Early Access →',
  },
  meta: {
    en: {
      title: 'Workflow Automation Without Code — Flow80',
      description:
        'Flow80 connects your systems and automates your operations. No developers, no complicated setup. Get started in minutes.',
    },
    da: {
      title: 'Automatisering uden kode — Flow80',
      description:
        'Flow80 forbinder dine systemer og automatiserer dine arbejdsgange. Ingen udviklere, ingen kompliceret opsætning. Kom i gang på minutter.',
    },
    sv: {
      title: 'Automatisering utan kodning — Flow80',
      description:
        'Flow80 kopplar ihop dina system och automatiserar dina arbetsflöden. Inga utvecklare, ingen komplicerad setup. Kom igång på några minuter.',
    },
  },
};

const da: Translations = {
  ...en,
  nav: {
    howItWorks: 'Sådan virker det',
    pricing: 'Priser',
    getEarlyAccess: 'Få tidlig adgang →',
  },
  hero: {
    headline: 'Din virksomhed kører på manuelt arbejde. Vi løser det.',
    subheadline:
      'Flow80 forbinder dine systemer og automatiserer dine arbejdsgange — uden udviklere, uden kompliceret setup. Kom i gang på minutter, ikke måneder.',
    ctaPrimary: 'Få tidlig adgang →',
    ctaSecondary: 'Se hvordan det virker ↓',
    trustBadge1: 'Udviklet i Danmark',
    trustBadge2: 'GDPR-compliant',
    trustBadge3: 'Sikkerhed indbygget',
  },
  problem: {
    sectionTitle: 'Laver I stadig alt manuelt?',
    card1Title: 'Dine systemer taler ikke sammen',
    card1Text:
      'Hver eneste operations-afdeling har det samme problem. Dine systemer taler ikke sammen. Dine medarbejdere bruger timer hver uge på at kopiere data fra ét sted til et andet.',
    card2Title: 'Ting bliver glemt. Fejl slipper igennem.',
    card2Text:
      'Ting bliver glemt. Fejl slipper igennem. Og hver gang noget nyt skal automatiseres, venter du enten på IT eller betaler du et bureau.',
    card3Title: 'Værktøjerne virker bare ikke rigtigt',
    card3Text:
      'Du har prøvet værktøjerne. "No-code" byggerne kan enten ikke det du faktisk har brug for, eller de bryder sammen så snart noget går galt. Du ender alligevel med at holde øje med dem hele tiden.',
    closingText:
      'Flow80 er anderledes. Det er bygget til rigtigt operations-arbejde — den slags der faktisk betyder noget i din virksomhed. Det forbinder de systemer du allerede bruger, håndterer logikken, og kører stabilt uden at du skal holde øje med det.',
    closingBold: 'Du sætter det op én gang. Det virker. Du går videre.',
  },
  whatsComing: {
    sectionTitle: 'Hvad du vil kunne gøre',
    cards: [
      {
        badge: 'Funktionspreview',
        name: 'Træk. Klik. Færdig.',
        description:
          'Byg automatiserede workflows uden at skrive en eneste linje kode. Forbind dine systemer, definer trinene, og lad Flow80 klare resten. Hvis du nogensinde har brugt et flowchart-værktøj, kan du bygge et workflow i Flow80.',
      },
      {
        badge: 'Funktionspreview',
        name: 'Start med noget der allerede virker.',
        description:
          'Ved du ikke hvor du skal starte? Vælg fra et bibliotek af afprøvede workflow-skabeloner til almindelige operations-opgaver — ordrebehandling, datasynkronisering, notifikationer og mere. Tilpas, byg ikke fra bunden.',
      },
      {
        badge: 'Funktionspreview',
        name: 'Altid styr på hvad der kører.',
        description:
          'Se hver workflow-kørsel mens det sker. Få præcis at vide hvilke data der flyttede sig, hvad der lykkedes, og hvad der kræver opmærksomhed — før det bliver et problem. Ingen overraskelser.',
      },
      {
        badge: 'Funktionspreview',
        name: 'Det håndterer kanttilfældene så du slipper.',
        description:
          'Når noget uventet sker — et system er nede, data mangler, et trin fejler — stopper Flow80 ikke bare. Det logger problemet, prøver igen intelligent, og giver dig besked kun når menneskelig indgriben faktisk er nødvendig.',
      },
    ],
  },
  pricingTeaser: {
    sectionTitle: 'Priser. (Vi holdt det simpelt.)',
    leadIn: 'Én fast pris. Ingen brugergebyrer. Ingen kørselsgebyrer. Ingen indviklede prisstrukturer at tyde.',
    pricePreview: 'Kommer snart: 1.099 kr./md. — alt inkluderet',
    noCreditCard: '✦ Intet kreditkort kræves for at tilmelde dig.',
    earlyAccessHeading: 'Tidlige brugere låser en eksklusiv pris.',
    earlyAccessBody: 'Du er blandt de første der får besked når vi åbner.',
    ctaPrimary: 'Anmod om tidlig adgang →',
  },
  newsletter: {
    heading: 'Hold dig opdateret.',
    subheading: 'Vær blandt de første når vi lancerer — og få tidlig adgang før alle andre.',
    nameLabel: 'Dit navn',
    namePlaceholder: 'Marie Hansen',
    emailLabel: 'Arbejdsemail',
    emailPlaceholder: 'marie@virksomhed.dk',
    submitLabel: 'Giv mig besked →',
    privacyNote: 'Vi spammer ikke. Afmeld når som helst.',
    successHeading: 'Du er på listen.',
    successBody: 'Vi mailer dig så snart Flow80 er klar — og du får tidlig adgang før vi åbner for offentligheden.',
    errorRequired: 'Dette felt er påkrævet',
    errorInvalidEmail: 'Indtast venligst en gyldig email',
    errorGeneric: 'Noget gik galt. Prøv igen eller email os på hello@flow80.com',
    sending: 'Sender...',
  },
  earlyAccess: {
    heading: 'Vil du være først?',
    subheading: 'Ansøg om tidlig adgang og få adgang til Flow80 før lanceringen. Pladserne er begrænsede.',
    nameLabel: 'Dit navn',
    namePlaceholder: 'Thomas Jensen',
    emailLabel: 'Arbejdsemail',
    emailPlaceholder: 'thomas@operationsvirksomhed.dk',
    companyLabel: 'Virksomhedsnavn',
    companyPlaceholder: 'Acme Logistics',
    challengeLabel: 'Største automatiseringsudfordring',
    challengePlaceholder: 'Fortæl os kort hvad du har brug for (valgfrit)',
    submitLabel: 'Anmod om tidlig adgang →',
    trustNote: 'Vi gennemgår din ansøgning og kontakter dig personligt. Ingen salgsopkald. Ingen pres.',
    successHeading: 'Du er på listen.',
    successBody: 'Vi gennemgår din ansøgning og kontakter dig personligt. Bliv ved med hvad du laver — vi sender detaljer når din plads er klar.',
    errorRequired: 'Dette felt er påkrævet',
    errorInvalidEmail: 'Indtast venligst en gyldig email',
    errorGeneric: 'Noget gik galt. Prøv igen eller email os på hello@flow80.com',
    sending: 'Sender...',
  },
  footer: {
    tagline: 'Bygget til operations-teams der er trætte af manuelt arbejde.',
    links: {
      about: 'Om os',
      howItWorks: 'Sådan virker det',
      pricing: 'Priser',
      privacy: 'Privatlivspolitik',
      terms: 'Vilkår',
    },
    badges: {
      gdpr: 'GDPR-compliant',
      denmark: 'Udviklet i Danmark',
      secure: 'Sikkerhed indbygget',
    },
    copyright: '© 2026 Flow80. Alle rettigheder forbeholdes.',
    ctaStripHeadline: 'Flow80 — Automatiser dine arbejdsgange uden at skrive kode.',
    ctaStripCta: 'Anmod om tidlig adgang →',
  },
  meta: {
    en: en.meta.en,
    da: {
      title: 'Automatisering uden kode — Flow80',
      description:
        'Flow80 forbinder dine systemer og automatiserer dine arbejdsgange. Ingen udviklere, ingen kompliceret opsætning. Kom i gang på minutter.',
    },
    sv: en.meta.sv,
  },
};

const sv: Translations = {
  ...en,
  nav: {
    howItWorks: 'Så fungerar det',
    pricing: 'Prissättning',
    getEarlyAccess: 'Få tidig tillgång →',
  },
  hero: {
    headline: 'Ditt företag kör på manuellt arbete. Vi fixar det.',
    subheadline:
      'Flow80 kopplar ihop dina system och automatiserar dina arbetsflöden — inga utvecklare, ingen komplicerad setup. Kom igång på några minuter, inte månader.',
    ctaPrimary: 'Få tidig tillgång →',
    ctaSecondary: 'Se hur det fungerar ↓',
    trustBadge1: 'Utvecklat i Danmark',
    trustBadge2: 'GDPR-kompatibelt',
    trustBadge3: 'Säkert byggt',
  },
  problem: {
    sectionTitle: 'Håller ni fortfarande på med allt manuellt?',
    card1Title: 'Era system pratar inte med varandra',
    card1Text:
      'Varje operations-team har samma problem. Era system pratar inte med varandra. Era medarbetare lägger timmar varje vecka på att kopiera data från ett ställe till ett annat.',
    card2Title: 'Saker missas. Fel smiter igenom.',
    card2Text:
      'Saker missas. Fel smiter igenom. Och varje gång något nytt behöver automatiseras väntar ni antingen på IT eller betalar ett agentur.',
    card3Title: 'Verktygen fungerar helt enkelt inte',
    card3Text:
      'Ni har provat verktygen. "No-code"-byggarna kan antingen inte göra det ni faktiskt behöver, eller så går de sönder så fort något går fel. Ni slutar ändå med att hålla koll på dem hela tiden.',
    closingText:
      'Flow80 är annorlunda. Det är byggt för riktigt operations-arbete — den sortens som faktiskt betyder något i er verksamhet. Det kopplar ihop de system ni redan använder, hanterar logiken, och kör stabilt utan att ni behöver bevaka det.',
    closingBold: 'Du ställer in det en gång. Det fungerar. Du går vidare.',
  },
  whatsComing: {
    sectionTitle: 'Vad du kommer att kunna göra',
    cards: [
      {
        badge: 'Funktionsförhandsvisning',
        name: 'Dra. Klicka. Klart.',
        description:
          'Bygg automatiserade workflows utan att skriva en enda rad kod. Koppla ihop dina system, definiera stegen, och låt Flow80 sköta resten. Om du någonsin har använt ett flödesschema-verktyg kan du bygga ett workflow i Flow80.',
      },
      {
        badge: 'Funktionsförhandsvisning',
        name: 'Börja med något som redan fungerar.',
        description:
          'Vet du inte var du ska börja? Välj från ett bibliotek av beprövade workflow-mallar för vanliga operations-uppgifter — orderhantering, datasynkning, notifieringar och mer. Anpassa, bygg inte från noll.',
      },
      {
        badge: 'Funktionsförhandsvisning',
        name: 'Ha all koll på vad som körs.',
        description:
          'Se varje workflow-körning i realtid. Vet exakt vilka data som flyttades, vad som lyckades, och vad som behöver uppmärksamhet — innan det blir ett problem. Inga överraskningar.',
      },
      {
        badge: 'Funktionsförhandsvisning',
        name: 'Det hanterar kantfallen så du slipper.',
        description:
          'När något oväntat händer — ett system är nere, data saknas, ett steg misslyckas — stannar inte Flow80 bara. Det loggar problemet, försöker igen intelligent, och varnar dig bara när mänsklig inmatning faktiskt behövs.',
      },
    ],
  },
  pricingTeaser: {
    sectionTitle: 'Prissättning. (Vi höll det enkelt.)',
    leadIn: 'Ett fast pris. Inga användaravgifter. Inga körningsavgifter. Inga krångliga nivåer att tyda.',
    pricePreview: 'Kommer snart: 1.099 kr/månad — allt inkluderat',
    noCreditCard: '✦ Inget kreditkort krävs för att gå med på väntelistan.',
    earlyAccessHeading: 'Tidiga användare låser ett exklusivt pris.',
    earlyAccessBody: 'Du är bland de första som får veta när vi öppnar.',
    ctaPrimary: 'Ansök om tidig tillgång →',
  },
  newsletter: {
    heading: 'Håll dig uppdaterad.',
    subheading: 'Var bland de första när vi lanserar — och få tidig tillgång före alla andra.',
    nameLabel: 'Ditt namn',
    namePlaceholder: 'Marie Hansen',
    emailLabel: 'Arbetsemail',
    emailPlaceholder: 'marie@foretag.se',
    submitLabel: 'Meddela mig →',
    privacyNote: 'Vi spammer inte. Avregistrera dig när som helst.',
    successHeading: 'Du är på listan.',
    successBody: 'Vi mailar dig så snart Flow80 är redo — och du får tidig tillgång innan vi öppnar för allmänheten.',
    errorRequired: 'Detta fält är obligatoriskt',
    errorInvalidEmail: 'Ange en giltig email',
    errorGeneric: 'Något gick fel. Försök igen eller maila oss på hello@flow80.com',
    sending: 'Skickar...',
  },
  earlyAccess: {
    heading: 'Vill du vara först?',
    subheading: 'Ansök om tidig tillgång och få tillgång till Flow80 före lanseringen. Platserna är begränsade.',
    nameLabel: 'Ditt namn',
    namePlaceholder: 'Thomas Lindberg',
    emailLabel: 'Arbetsemail',
    emailPlaceholder: 'thomas@operationsforetag.se',
    companyLabel: 'Företagsnamn',
    companyPlaceholder: 'Acme Logistics',
    challengeLabel: 'Största automatiseringsutmaningen',
    challengePlaceholder: 'Berätta kort vad du behöver (valfritt)',
    submitLabel: 'Ansök om tidig tillgång →',
    trustNote: 'Vi granskar din ansökan och kontaktar dig personligt. Inga säljsamtal. Ingen press.',
    successHeading: 'Du är på listan.',
    successBody: 'Vi granskar din ansökan och kontaktar dig personligt. Fortsätt med vad du gör — vi skickar detaljer när din plats är redo.',
    errorRequired: 'Detta fält är obligatoriskt',
    errorInvalidEmail: 'Ange en giltig email',
    errorGeneric: 'Något gick fel. Försök igen eller maila oss på hello@flow80.com',
    sending: 'Skickar...',
  },
  footer: {
    tagline: 'Byggt för operations-team som är trötta på manuellt arbete.',
    links: {
      about: 'Om oss',
      howItWorks: 'Så fungerar det',
      pricing: 'Prissättning',
      privacy: 'Integritetspolicy',
      terms: 'Villkor',
    },
    badges: {
      gdpr: 'GDPR-kompatibelt',
      denmark: 'Utvecklat i Danmark',
      secure: 'Säkert byggt',
    },
    copyright: '© 2026 Flow80. Alla rättigheter förbehållna.',
    ctaStripHeadline: 'Flow80 — Automatisera dina arbetsflöden utan att skriva kod.',
    ctaStripCta: 'Ansök om tidig tillgång →',
  },
  meta: {
    en: en.meta.en,
    da: en.meta.da,
    sv: {
      title: 'Automatisering utan kodning — Flow80',
      description:
        'Flow80 kopplar ihop dina system och automatiserar dina arbetsflöden. Inga utvecklare, ingen komplicerad setup. Kom igång på några minuter.',
    },
  },
};

export const translations: Record<Locale, Translations> = { en, da, sv };
