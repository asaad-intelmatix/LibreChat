import { useEffect, useRef } from 'react';
import { TOptions } from 'i18next';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { resources } from '~/locales/i18n';
import store from '~/store';

export type TranslationKeys = keyof typeof resources.en.translation;

export default function useLocalize() {
  const lang = useRecoilValue(store.lang);
  const { t, i18n } = useTranslation();
  const prevDir = useRef(i18n.dir());

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    const direction = i18n.dir();

    if (prevDir.current !== direction) {
      document.body.style.filter = 'blur(2px)';
      document.body.style.opacity = '0.7';
      document.documentElement.dir = direction;
      document.documentElement.lang = i18n.language;
      setTimeout(() => {
        document.body.style.filter = 'blur(0)';
        document.body.style.opacity = '1';
      }, 200);
    } else {
      document.documentElement.dir = direction;
      document.documentElement.lang = i18n.language;
    }

    prevDir.current = direction;
  }, [lang, i18n]);

  return (phraseKey: TranslationKeys, options?: TOptions) => t(phraseKey, options);
}
