import { NextResponse } from 'next/server';

const ALLOWED_PARTNERS = [
  'partner1000', 'partner1039', 'partner1043',
  'partner1044', 'partner1045', 'partner1073', 'partnerCLD',
];

const SUPPORTED_LOCALES = [
  'all', 'gb', 'au', 'br', 'ca', 'de', 'ie', 'nz', 'no', 'fi',
  'at', 'ch', 'dk', 'us', 'se', 'it', 'es', 'hu', 'pl', 'gr',
  'cz', 'fr', 'sk', 'be', 'nl', 'pt', 'bg', 'in', 'id', 'lk',
  'tr', 'za', 'qa', 'ae', 'sa', 'kz', 'az', 'uz',
];

const DEFAULT_LOCALE = 'au';
const PUBLIC_FILE = /\.(.*)$/;

function detectCountry(request) {
  const cf = request.headers.get('cf-ipcountry');
  if (cf && cf !== 'XX' && cf !== 'T1') return cf.toLowerCase();
  const vercel = request.headers.get('x-vercel-ip-country');
  if (vercel) return vercel.toLowerCase();
  return null;
}

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname, searchParams } = url;

  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const rawKeyword = searchParams.get('keyword');
  const adCampaignId = searchParams.get('ad_campaign_id');

  const match = rawKeyword?.match(/partner\d+/);
  let partnerId = match ? match[0] : null;

  if (partnerId === 'partner1043' || partnerId === 'partner1044') partnerId = 'partner1000';
  if (partnerId === 'partner1073') {
    const suffixMatch = rawKeyword?.match(/partner1073_(b\d+)/);
    if (suffixMatch?.[1] === 'b1') partnerId = 'partner1000';
  }

  if (!partnerId) {
    const cookiePartner = request.cookies.get('partnerId')?.value;
    partnerId = cookiePartner || 'partner1000';
    if (partnerId === 'partner1043' || partnerId === 'partner1044') partnerId = 'partner1000';
  }
  if (!ALLOWED_PARTNERS.includes(partnerId)) partnerId = 'partner1000';

  const partnerGeoMap = {
    partner1000: ['ALL','AU','BR','CA','DE','IE','NZ','NO','FI','AT','CH','DK','US','SE','IT','ES','HU','PL','GR','CZ','FR','SK','BE','NL','PT','BG'],
    partner1039: ['ALL','GB','BR','AU','CA','DE','IE','NZ','NO','FI','US','AT','CH','DK','SE','IT','ES','IN','ID','LK','HU','PL','GR','CZ','FR','SK','BE','NL','PT','TR','BG','QA','AE','SA','KZ','UZ','AZ'],
    partner1045: ['ALL','AU','CA','DE','NZ','NO','AT','CH','DK','IE','FI','FR','IT','ES','PL','CZ','HU','SK','BE','GR','SE','PT','NL','GB','US','TR','BG'],
    partner1073: ['ALL','AU','BR','CA','DE','IE','NZ','NO','FI','AT','CH','DK','US','SE','IT','ES','HU','PL','GR','CZ','FR','SK','BE','NL','PT','BG'],
    partnerCLD:  ['ALL','AU','CA','DE','NZ','NO','AT','CH','DK','IE','FI','FR','IT','ES','PL','CZ','HU','SK','BE','GR','NL','SE','PT','GB','US'],
  };
  const allowedGeos = partnerGeoMap[partnerId] || partnerGeoMap['partner1000'];

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 1 && segments[0] === segments[1]) {
    return NextResponse.redirect('/' + segments.slice(1).join('/') + url.search);
  }

  const pathLocale = segments[0];
  const hasValidLocale = SUPPORTED_LOCALES.includes(pathLocale);
  const cookieOptions = { path: '/', maxAge: 60 * 60 * 24 * 365 };

  const setAllCookies = (res) => {
    res.cookies.set('NEXT_LOCALE', hasValidLocale ? pathLocale : res._locale, cookieOptions);
    res.cookies.set('partnerId', partnerId, cookieOptions);
    res.cookies.set('allowedGeos', JSON.stringify(allowedGeos), cookieOptions);
    if (rawKeyword) res.cookies.set('rawKeyword', rawKeyword, cookieOptions);
    if (adCampaignId) res.cookies.set('ad_campaign_id', adCampaignId, cookieOptions);
  };

  if (!hasValidLocale) {
    const detected = detectCountry(request);
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    let targetLocale = DEFAULT_LOCALE;
    if (detected && SUPPORTED_LOCALES.includes(detected)) targetLocale = detected;
    else if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) targetLocale = cookieLocale;

    url.pathname = `/${targetLocale}${pathname}`;
    const res = NextResponse.redirect(url);
    res.cookies.set('NEXT_LOCALE', targetLocale, cookieOptions);
    res.cookies.set('partnerId', partnerId, cookieOptions);
    res.cookies.set('allowedGeos', JSON.stringify(allowedGeos), cookieOptions);
    if (rawKeyword) res.cookies.set('rawKeyword', rawKeyword, cookieOptions);
    if (adCampaignId) res.cookies.set('ad_campaign_id', adCampaignId, cookieOptions);
    return res;
  }

  const res = NextResponse.next();
  res.cookies.set('NEXT_LOCALE', pathLocale, cookieOptions);
  res.cookies.set('partnerId', partnerId, cookieOptions);
  res.cookies.set('allowedGeos', JSON.stringify(allowedGeos), cookieOptions);
  if (rawKeyword) res.cookies.set('rawKeyword', rawKeyword, cookieOptions);
  if (adCampaignId) res.cookies.set('ad_campaign_id', adCampaignId, cookieOptions);
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
