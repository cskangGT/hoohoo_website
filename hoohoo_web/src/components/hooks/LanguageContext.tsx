import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const currentLang = pathParts[1];
    
    if (['ko', 'en'].includes(currentLang)) {
      setLanguage(currentLang);
      i18n.changeLanguage(currentLang);
    }
  }, [location.pathname]);

  const toggleLanguage = () => {
    const newLang = language === 'ko' ? 'en' : 'ko';
    const currentPath = location.pathname.replace(/^\/(ko|en)/, '');
    console.log("currentPath", currentPath);
    
    console.log("location.state", location.state);
    
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    navigate(`/${newLang}${currentPath}`);
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
