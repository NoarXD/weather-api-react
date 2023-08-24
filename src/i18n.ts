import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import th from './locales/th.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      }, 
      th: {
        translation: th
      }
    },
    lng: 'en',
    // etc
  });