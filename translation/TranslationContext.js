// TranslationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from './translations.json'; 
import { getLocales } from 'expo-localization';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState(getLocales()[0].languageCode);
  const [translatedStrings, setTranslatedStrings] = useState(translations[locale]);

  useEffect(() => {
    setTranslatedStrings(translations[locale]);
  }, [locale]);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <TranslationContext.Provider value={{ locale, changeLocale, translatedStrings }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
