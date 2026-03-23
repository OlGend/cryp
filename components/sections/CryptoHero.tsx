'use client';
import { useEffect, useState } from 'react';
import { useGlobalData } from '@/context/GlobalDataContext';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';

export default function CryptoHero() {
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

  if (!brands || brands.length === 0) return <div className="skeleton-loader" />;

  const featured = brands[0];
  const { brand, content } = featured;
  const affiliateUrl = buildUrl(content.our_link, 'Hero');

  return (
    <section id="hero" className="banner s3">
      <div className="shape" />
      <div className="shape right" />
      <div className="shape s3 right" />
      <div className="container big">
        <div className="row">
          <div className="col-xl-5 col-md-12">
            <div className="banner__left">
              <div className="block-text">
                <h2 className="heading">
                  {t('Discover the Best Crypto Casinos')}
                  {' '}<span className="arlo_tm_animation_text_word" />
                </h2>
                <p className="desc">
                  {t('Play with BTC, ETH, and USDT at top crypto casinos.')}{' '}
                  {t('Instant withdrawals, huge bonuses, and no KYC required.')}
                </p>
                <Link href={brands.length > 1 ? buildUrl(brands[1].content.our_link, 'HeroCTA1') : affiliateUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                  <span>{t('Top Rated Casinos')}</span>
                </Link>
                <Link href={brands.length > 2 ? buildUrl(brands[2].content.our_link, 'HeroCTA2') : affiliateUrl} target="_blank" rel="noopener noreferrer" className="action-btn s1">
                  <span>{t('Best Crypto Bonuses')}</span>
                </Link>
              </div>
              <div className="couter-list">
                <div className="couter-box">
                  <h4 className="numb">$560k<span>+</span></h4>
                  <p>{t('Won by Players Daily')}</p>
                </div>
                <div className="couter-box">
                  <h4 className="numb">50<span>+</span></h4>
                  <p>{t('Trusted Crypto Casinos')}</p>
                </div>
                <div className="couter-box">
                  <h4 className="numb">20<span>+</span></h4>
                  <p>{t('Supported Cryptocurrencies')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-md-12">
            <div className="banner__right">
              <div className="image-1">
                <img src="/assets/images/layouts/deco.png" alt="" />
              </div>
              <div className="banner-box" data-aos="fade-up" data-aos-duration={2000}>
                <div className="top">
                  <Image
                    src={`/images/${brand.brand_logo}.png`}
                    alt={brand.casino_brand}
                    width={160}
                    height={80}
                    style={{ objectFit: 'contain' }}
                  />
                  <span className="badge" style={{
                    background: 'linear-gradient(135deg, #f7c948 0%, #ff9800 100%)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#000',
                  }}>
                    ⭐ {t("Editor's Pick")}
                  </span>
                </div>
                <div className="main">
                  <div className="info">
                    <p>{t('Welcome Bonus')}</p>
                    <h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.value) }} />
                  </div>
                  <div className="crypto-icons" style={{ display: 'flex', gap: '12px', fontSize: '1.4rem' }}>
                    <span title="Bitcoin">₿</span>
                    <span title="Ethereum">Ξ</span>
                    <span title="USDT">₮</span>
                  </div>
                </div>
                <div className="button">
                  <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                    <span>{t('Claim Bonus')} →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
