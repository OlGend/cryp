'use client';
import { useEffect, useState } from 'react';
import { useGlobalData } from '@/context/GlobalDataContext';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';

const cryptoFeatures = [
  'No KYC', 'Instant withdrawals', 'Provably fair games',
  'High RTP', 'Thousands of games', 'Fast crypto deposits',
];

function getFeatures(brandId: number) {
  const seed = brandId % cryptoFeatures.length;
  return [0, 1, 2].map(i => cryptoFeatures[(seed + i) % cryptoFeatures.length]);
}

export default function CryptoZigzag() {
  const { brands, partnerId } = useGlobalData();
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('-');
  const [adCampaignId, setAdCampaignId] = useState('-');

  useEffect(() => {
    const getCookie = (name: string) =>
      document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] || '-';
    setKeyword(getCookie('rawKeyword'));
    setAdCampaignId(getCookie('ad_campaign_id'));
  }, []);

  const buildUrl = (ourLink: string, creativeId: string) =>
    `${ourLink}?source=${partnerId}&keyword=${keyword}&ad_campaign_id=${adCampaignId}&creative_id=${creativeId}`;

  if (!brands || brands.length < 4) return null;

  return (
    <section id="block3" className="roadmap">
      <img src="/assets/images/background/line.png" alt="" className="img-line" />
      <div className="shape" />
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-12">
            <div data-aos="fade-up" data-aos-duration={2000}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {brands.slice(0, 4).map(({ brand, content }: any, i: number) => {
                const features = getFeatures(brand.id);
                const affiliateUrl = buildUrl(content.our_link, 'Zigzag');

                return (
                  <div key={brand.id || i} style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{ height: '40px', display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <Image
                        src={`/images/${brand.brand_logo}.png`}
                        alt={brand.casino_brand}
                        width={80}
                        height={40}
                        style={{ objectFit: 'contain', maxHeight: '40px', width: 'auto' }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h6 style={{ marginBottom: '10px', fontSize: '0.9rem', lineHeight: 1.3 }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.value) }}
                      />

                      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '14px', fontSize: '0.85rem' }}>
                        {features.map((f, fi) => (
                          <li key={fi} style={{ marginBottom: '3px' }}>
                            <span style={{ color: '#00d26a' }}>●</span> {t(f)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer" className="action-btn"
                      style={{ marginTop: 'auto', display: 'block', textAlign: 'center' }}>
                      <span>{t('Play Now')}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="block-text" data-aos="fade-left" data-aos-duration={2000}
              style={{ paddingTop: '60px', position: 'sticky', top: '120px' }}>
              <h6 className="sub-heading"><span>{t("Editor's Choice")}</span></h6>
              <h3 className="heading">{t('Play at the Most Trusted Crypto Casinos')}</h3>
              <p className="desc">{t('Handpicked crypto casinos with the best bonuses, instant withdrawals, and no KYC.')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
