import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import langEn from './en.json';
import langKo from './ko.json';

const resources = {
  en: {
    translation: langEn,
  },
  ko: {
    translation: langKo,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: sessionStorage.getItem('language'),
  debug: true,
  defaultNS: 'translation',
  fallbackLng: 'ko',
  supportedLngs: ['en', 'ko'],
  ns: 'translation',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on('languageChanged', language => {
  console.log('languageChanged', language);
  sessionStorage.setItem('language', language);
});

export default i18n;
