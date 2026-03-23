'use client';
import { useEffect, useState } from 'react';
import { useGlobalData } from '@/context/GlobalDataContext';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css/effect-coverflow';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const WITHDRAWAL_SPEEDS = ['Instant', '< 5 min', '< 10 min'];

function getWithdrawalSpeed(brandId: number | string): string {
  const id = typeof brandId === 'string' ? parseInt(brandId, 10) || 0 : brandId;
  return WITHDRAWAL_SPEEDS[id % WITHDRAWAL_SPEEDS.length];
}

const swiperOptions = {
  modules: [Autoplay, EffectCoverflow, Navigation],
  loop: true,
  spaceBetween: 30,
  slidesPerView: 3 as number | 'auto',
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
  },
  centeredSlides: true,
  watchSlidesProgress: true,
  effect: 'coverflow' as const,
  grabCursor: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.coverflow-next',
    prevEl: '.coverflow-prev',
  },
};

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  height: '420px',
  maxWidth: '360px',
  margin: '0 auto',
};

const metaHeaderStyle: React.CSSProperties = {
  padding: '16px 20px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  flexShrink: 0,
};

const cryptoRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  marginTop: '4px',
  fontSize: '0.8rem',
  fontWeight: 600,
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

export default function CryptoCoverflowSlider() {
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

  if (!brands || brands.length === 0) return null;

  return (
    <section id="block6" className="montono s3" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="block-text center">
              <h3 className="heading" data-aos="fade-up">
                {t('Featured Crypto Casinos')}
              </h3>
              <p className="desc" data-aos="fade-up" style={{ marginBottom: '40px' }}>
                {t('Swipe through the best crypto casinos with instant payouts and huge bonuses')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ position: 'relative' }}>
        <Swiper {...swiperOptions} className="swiper">
          {brands.map((item: any, idx: number) => {
            const { brand, content } = item;
            const affiliateUrl = buildUrl(content.our_link, `Coverflow_${idx}`);
            const speed = getWithdrawalSpeed(brand.id);

            return (
              <SwiperSlide key={brand.id || idx}>
                <div style={cardStyle}>
                  <div style={metaHeaderStyle}>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={labelStyle}>{t('Crypto Accepted')}</span>
                      <div style={cryptoRowStyle}>
                        <span>BTC</span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span>ETH</span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span>USDT</span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span>LTC</span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span>DOGE</span>
                      </div>
                    </div>
                    <div>
                      <span style={labelStyle}>{t('Withdrawals')}</span>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4ade80', marginTop: '2px' }}>
                        ⚡ {speed}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px 20px 16px',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '80px',
                      marginBottom: '20px',
                    }}>
                      <Image
                        src={`/images/${brand.brand_logo}.png`}
                        alt={brand.casino_brand}
                        width={140}
                        height={70}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                      {t('Welcome Bonus')}
                    </p>
                    <h6
                      style={{ fontWeight: 700, fontSize: '0.95rem', textAlign: 'center', lineHeight: 1.4 }}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.value) }}
                    />
                  </div>
                  <div style={{ padding: '0 20px 20px', marginTop: 'auto', flexShrink: 0 }}>
                    <Link
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn"
                      style={{ display: 'block', textAlign: 'center', width: '100%' }}
                    >
                      <span>{t('Claim Bonus')} →</span>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="coverflow-prev" style={{
          position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, cursor: 'pointer', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
        }}>
          <svg width={10} height={15} viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.1212 7.46543L7.56346 13.8092C7.8205 14.0662 8.23613 14.0662 8.49317 13.8092L8.88144 13.4209C9.13848 13.1639 9.13848 12.7482 8.88144 12.4912L3.2869 7.00059L8.87598 1.50997C9.133 1.25293 9.133 0.837303 8.87598 0.580281L8.48769 0.191991C8.23067 -0.0650311 7.81504 -0.0650311 7.558 0.191991L1.11578 6.53574C0.864303 6.79278 0.864302 7.20841 1.1212 7.46543Z" fill="white" />
          </svg>
        </div>
        <div className="coverflow-next" style={{
          position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, cursor: 'pointer', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
        }}>
          <svg width={10} height={15} viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.8788 7.46543L2.43654 13.8092C2.1795 14.0662 1.76387 14.0662 1.50683 13.8092L1.11856 13.4209C0.861521 13.1639 0.861521 12.7482 1.11856 12.4912L6.7131 7.00059L1.12402 1.50997C0.866998 1.25293 0.866998 0.837303 1.12402 0.580281L1.51231 0.191991C1.76933 -0.0650311 2.18496 -0.0650311 2.442 0.191991L8.88422 6.53574C9.1357 6.79278 9.1357 7.20841 8.8788 7.46543Z" fill="white" fillOpacity="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
