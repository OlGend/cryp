import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GlobalDataProvider, BrandContent } from '@/context/GlobalDataContext';
import { I18nProvider } from '@/components/I18nProvider';
import AppShell from '@/components/AppShell';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../public/assets/css/animate.css';
import '../../public/assets/css/app.css';

const SUPPORTED_LOCALES = [
  'all', 'gb', 'au', 'br', 'ca', 'de', 'ie', 'nz', 'no', 'fi',
  'at', 'ch', 'dk', 'us', 'se', 'it', 'es', 'hu', 'pl', 'gr',
  'cz', 'fr', 'sk', 'be', 'nl', 'pt', 'bg', 'in', 'id', 'lk',
  'tr', 'za', 'qa', 'ae', 'sa', 'kz', 'az', 'uz',
];

const localeToGeo: Record<string, string> = {
  all: 'ALL', en: 'ALL', gb: 'GB', au: 'AU', br: 'BR', ca: 'CA',
  de: 'DE', ie: 'IE', nz: 'NZ', no: 'NO', fi: 'FI', at: 'AT',
  ch: 'CH', dk: 'DK', us: 'US', se: 'SE', it: 'IT', es: 'ES',
  hu: 'HU', pl: 'PL', gr: 'GR', cz: 'CZ', fr: 'FR', sk: 'SK',
  be: 'BE', nl: 'NL', pt: 'PT', bg: 'BG', in: 'IN', id: 'ID',
  lk: 'LK', tr: 'TR', za: 'ZA', qa: 'QA', ae: 'AE', sa: 'SA',
  kz: 'KZ', uz: 'UZ', az: 'AZ',
};

function getLanguageContent(languages: any[], partner_id: string, geo: string) {
  for (const lang of languages) {
    if (lang.partner_id !== partner_id) continue;
    const found = lang.content?.find((c: any) => c.geo === geo);
    if (found) {
      return { ...found, our_link: found.our_link || lang.our_link || '' };
    }
  }
  return null;
}

function processData(data: any[], partner_id: string, geo: string) {
  if (!Array.isArray(data)) return [];
  const arr = [...data];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.map(brand => {
    let langs: any[] = [];
    try {
      langs = typeof brand.languages === 'string'
        ? JSON.parse(brand.languages || '[]')
        : (Array.isArray(brand.languages) ? brand.languages : []);
    } catch { return null; }
    const content = getLanguageContent(langs, partner_id, geo);
    if (!content) return null;
    return { brand, content };
  }).filter(Boolean) as BrandContent[];
}

export const revalidate = 300;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!SUPPORTED_LOCALES.includes(locale)) redirect('/au');

  const geo = localeToGeo[locale] ?? 'ALL';
  const cookieStore = cookies();
  const partnerId = cookieStore.get('partnerId')?.value ?? 'partner1000';
  const keyword = cookieStore.get('rawKeyword')?.value ?? '-';
  const adCampaignId = cookieStore.get('ad_campaign_id')?.value ?? '-';

  let brands: BrandContent[] = [];
  try {
    const endpoint = `https://born.topbon.us/end/fetch/brand_fetcher.php?partner_id=${partnerId}&geo=${geo}&category=Crypto_casinos`;
    const res = await fetch(endpoint, { next: { revalidate: 300 } });
    const data = await res.json();
    brands = processData(data, partnerId, geo);
  } catch (e) {
    brands = [];
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="shortcut icon" href="/assets/images/logo/favicon.png" />
        <link href="https://fonts.cdnfonts.com/css/conthrax" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GlobalDataProvider globalData={{ brands, partnerId, geo }}>
          <I18nProvider locale={locale}>
            <AppShell>
              {children}
            </AppShell>
          </I18nProvider>
        </GlobalDataProvider>
      </body>
    </html>
  );
}
