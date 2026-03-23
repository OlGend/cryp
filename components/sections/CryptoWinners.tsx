'use client';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const winners = [
  {
    name: 'Daniel M.',
    won: '0.84 BTC',
    text: 'Signed up through this site and claimed the welcome bonus. Hit a big win on slots and withdrew my BTC in less than 5 minutes. Smooth experience!',
  },
  {
    name: 'Alex T.',
    won: '$12,400 in USDT',
    text: 'Great list of crypto casinos. Picked one with no KYC and the withdrawal was instant. Definitely coming back.',
  },
  {
    name: 'Mark L.',
    won: '2.1 BTC',
    text: "Played blackjack and slots all night. Huge win and the payout came straight to my wallet. Fastest crypto casino payout I've seen.",
  },
];

const swiperOptions = {
  modules: [Autoplay, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  breakpoints: {
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
};

export default function CryptoWinners() {
  const { t } = useTranslation();

  return (
    <section id="block5" className="testimonials s2">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="testimonials__main">
              <div className="block-text center">
                <h6 className="sub-heading"><span>{t('Crypto Winners')}</span></h6>
                <h3 className="heading">{t('Latest Wins from Crypto Players')}</h3>
              </div>

              <Swiper {...swiperOptions} className="swiper testimonials-swiper s2">
                {winners.map((w, i) => (
                  <SwiperSlide key={i}>
                    <div className="box-testimonial center">
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #5C27FE, #00E3FF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#fff',
                      }}>
                        {w.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="info">
                        <h5 className="name">{w.name}</h5>
                        <p>{t('Verified Winner')} ✓</p>
                      </div>
                      <div style={{
                        color: '#f7c948',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        margin: '16px 0',
                      }}>
                        💰 {t('Won')} {w.won}
                      </div>
                      <p className="text"><em>&ldquo;{w.text}&rdquo;</em></p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
