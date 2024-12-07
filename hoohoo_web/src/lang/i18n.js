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
  lng: 'en',
  debug: true,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
