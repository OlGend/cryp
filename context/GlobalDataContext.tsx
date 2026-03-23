'use client';
import { createContext, useContext } from 'react';

export interface BrandContent {
  brand: {
    id: number;
    casino_brand: string;
    brand_logo: string;
    priority: number;
  };
  content: {
    geo: string;
    value: string;
    our_link: string;
    title_seo?: string;
    description_seo?: string;
  };
}

export interface GlobalDataContextType {
  brands: BrandContent[];
  partnerId: string;
  geo: string;
}

const GlobalDataContext = createContext<GlobalDataContextType>({
  brands: [],
  partnerId: 'partner1000',
  geo: 'AU',
});

export const GlobalDataProvider = ({
  children,
  globalData,
}: {
  children: React.ReactNode;
  globalData: GlobalDataContextType;
}) => (
  <GlobalDataContext.Provider value={globalData}>
    {children}
  </GlobalDataContext.Provider>
);

export const useGlobalData = () => useContext(GlobalDataContext);
