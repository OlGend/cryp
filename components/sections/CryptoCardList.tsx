'use client';
import { useEffect, useState } from 'react';
import { useGlobalData } from '@/context/GlobalDataContext';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';

export default function CryptoCardList() {
  const { brands, partnerId } = useGlobalData();
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('-');
  const [adCampaignId, setAdCampaignId] = useState('-');
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const getCookie = (name: string) =>
      document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] || '-';
    setKeyword(getCookie('rawKeyword'));
    setAdCampaignId(getCookie('ad_campaign_id'));
  }, []);

  const buildUrl = (ourLink: string, creativeId: string) =>
    `${ourLink}?source=${partnerId}&keyword=${keyword}&ad_campaign_id=${adCampaignId}&creative_id=${creativeId}`;

  if (!brands || brands.length === 0) return <div className="skeleton-loader" />;

  const withdrawalOptions = ['Instant', '< 5 min', '< 10 min'];

  return (
    <section id="block2" className="project s2">
      <div className="shape right" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="block-text center">
              <h6 className="sub-heading"><span>{t('Best Crypto Bonuses')}</span></h6>
              <h3 className="heading">{t('Discover the Best Crypto Casinos')}</h3>
            </div>
          </div>
        </div>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {brands.slice(0, visibleCount).map(({ brand, content }: any, i: number) => {
            const withdrawal = withdrawalOptions[brand.id % withdrawalOptions.length];
            const affiliateUrl = buildUrl(content.our_link, 'Crypto');

            return (
              <div key={brand.id || i} className="col-xl-3 col-md-6" style={{ display: 'flex', marginBottom: '30px' }}
                data-aos="fade-up" data-aos-delay={(i % 4) * 100} data-aos-duration={800}>
                <div className="project-box" style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                  <div className="crypto-meta" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    opacity: 0.7,
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '4px',
                  }}>
                    <span>{t('Crypto Accepted')}: ₿ Ξ ₮</span>
                    <span>{t('Withdrawals')}: {t(withdrawal)}</span>
                  </div>

                  <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '87px', marginBottom: '16px' }}>
                    <Image
                      src={`/images/${brand.brand_logo}.png`}
                      alt={brand.casino_brand}
                      width={174}
                      height={87}
                      loading="lazy"
                      style={{ objectFit: 'contain', maxHeight: '87px', width: 'auto' }}
                    />
                  </Link>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.4 }}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.value) }}
                    />
                  </div>

                  <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer" className="action-btn"
                    style={{ width: '100%', display: 'block', marginTop: 'auto' }}>
                    <span>{t('Play Now')}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < brands.length && (
          <div className="text-center" style={{ marginTop: '20px' }}>
            <button onClick={() => setVisibleCount(v => v + 4)} className="action-btn s1">
              <span>{t('Show More')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
