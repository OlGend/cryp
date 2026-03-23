'use client';
import CryptoHero from '@/components/sections/CryptoHero';
import CryptoCoverflowSlider from '@/components/sections/CryptoCoverflowSlider';
import CryptoCardList from '@/components/sections/CryptoCardList';
import CryptoZigzag from '@/components/sections/CryptoZigzag';
import TopRatedCasinos from '@/components/sections/TopRatedCasinos';
import CryptoWinners from '@/components/sections/CryptoWinners';

export default function CryptoHomePage() {
  return (
    <>
      <CryptoHero />
      <CryptoCoverflowSlider />
      <CryptoCardList />
      <CryptoZigzag />
      <TopRatedCasinos />
      <CryptoWinners />
    </>
  );
}
