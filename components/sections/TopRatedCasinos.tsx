'use client';
import { useEffect, useState } from 'react';
import { useGlobalData } from '@/context/GlobalDataContext';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';

export default function TopRatedCasinos() {
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

  return (
    <section id="block4" className="team s2">
      <div className="shape right" />
      <img src="/assets/images/background/line-2.png" alt="" className="img-line" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="block-text center">
              <h6 className="sub-heading"><span>{t('Top Picks')}</span></h6>
              <h3 className="heading">{t('Top Rated Crypto Casinos')}</h3>
            </div>
          </div>
        </div>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {brands.slice(0, visibleCount).map(({ brand, content }: any, i: number) => {
            const affiliateUrl = buildUrl(content.our_link, 'List');
            return (
              <div key={brand.id || i} className="col-xl-3 col-md-6" style={{ display: 'flex', marginBottom: '30px' }}>
                <div className="team-box" style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                  <div className="image" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '120px',
                    padding: '16px',
                  }}>
                    <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={`/images/${brand.brand_logo}.png`}
                        alt={brand.casino_brand}
                        width={174}
                        height={87}
                        loading="lazy"
                        style={{ objectFit: 'contain', maxHeight: '87px', width: 'auto' }}
                      />
                    </Link>
                  </div>
                  <div className="content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h5 className="name">{brand.casino_brand}</h5>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.4 }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.value) }}
                      />
                    </div>
                    <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer" className="action-btn"
                      style={{ marginTop: '16px', display: 'inline-block' }}>
                      <span>{t('Play Now')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < brands.length && (
          <div className="text-center" style={{ marginTop: '20px' }}>
            <button onClick={() => setVisibleCount(v => v + 8)} className="action-btn s1">
              <span>{t('Load More')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
