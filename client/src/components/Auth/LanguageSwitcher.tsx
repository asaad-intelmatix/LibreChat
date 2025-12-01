import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import store from '~/store';
import { useLocalize } from '~/hooks';

export default function LanguageSwitcher() {
  const [langcode, setLangcode] = useRecoilState(store.lang);
  const currentLang = langcode === 'ar' || langcode?.startsWith('ar') ? 'ar' : 'en';
  const localize = useLocalize();
  const handleLangChange = useCallback(
    (newLang: 'ar' | 'en') => {
      const langValue = newLang === 'ar' ? 'ar-SA' : 'en-US';
      setLangcode(langValue);
      Cookies.set('lang', langValue, { expires: 365 });
      requestAnimationFrame(() => {
        document.documentElement.lang = langValue;
      });
    },
    [setLangcode],
  );

  return (
    <div className="mb-4 flex h-10 items-center rounded-md bg-muted p-1">
      <button
        onClick={() => handleLangChange('ar')}
        className={`flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-all ${
          currentLang === 'ar'
            ? 'bg-background text-foreground shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'
            : 'bg-transparent text-foreground'
        }`}
      >
        {localize('com_ui_arabic')}
      </button>
      <button
        onClick={() => handleLangChange('en')}
        className={`flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-all ${
          currentLang === 'en'
            ? 'bg-background text-foreground shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'
            : 'bg-transparent text-foreground'
        }`}
      >
        {localize('com_ui_english')}
      </button>
    </div>
  );
}
