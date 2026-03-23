'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import Header1 from '@/components/layout/header/Header1';
import Footer1 from '@/components/layout/footer/Footer1';
import BackToTop from '@/components/elements/BackToTop';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [scroll, setScroll] = useState(false);
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => setMobileMenu(!isMobileMenu);

  useEffect(() => {
    AOS.init();
    const WOW = require('wowjs');
    const w = window as any;
    w.wow = new WOW.WOW({ live: false });
    w.wow.init();

    const onScroll = () => {
      setScroll(window.scrollY > 100);
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home-main header-fixed">
      <div className="wrapper">
        <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} big />
        {children}
        <Footer1 />
        <BackToTop />
      </div>
    </div>
  );
}
