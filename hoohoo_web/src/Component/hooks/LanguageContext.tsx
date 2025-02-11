import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../../lang/i18n';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [language, setLanguage] = useState('en');
  const paramLanguage = new URLSearchParams(location.search).get('lang');
  console.log("paramLanguage", paramLanguage);
  
  useEffect(() => {
    if (paramLanguage === 'ko' || paramLanguage === 'en') {
      setLanguage(paramLanguage);
      i18n.changeLanguage(paramLanguage);
    }
  }, []);
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ko' ? 'en' : 'ko'));
  };

  return (
    <LanguageContext.Provider value={{language, setLanguage, toggleLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
