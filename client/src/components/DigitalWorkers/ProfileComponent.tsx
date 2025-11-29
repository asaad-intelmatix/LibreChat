import { useState, useContext, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import * as Ariakit from '@ariakit/react';
import { LogOut, Languages, Palette } from 'lucide-react';
import { useAuthContext } from '~/hooks/AuthContext';
import { ThemeContext, DropdownPopup } from '@librechat/client';
import store from '~/store';
import type * as t from '~/common';

// Fallback avatar - will show user icon if image not available
const UserIcon = () => (
  <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export default function ProfileComponent() {
  const { user, logout } = useAuthContext();
  const { theme, setTheme } = useContext(ThemeContext);
  const [langcode, setLangcode] = useRecoilState(store.lang);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const userName = user?.name || user?.username || 'User';
  const avatarUrl = user?.avatar;
  const showFallback = !avatarUrl || imageError;

  const currentLang = langcode === 'ar' || langcode?.startsWith('ar') ? 'ar' : 'en';
  const currentTheme = theme === 'dark' ? 'dark' : 'light';

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

  const handleThemeChange = useCallback(
    (newTheme: 'light' | 'dark') => {
      setTheme(newTheme);
    },
    [setTheme],
  );

  const handleLogout = useCallback(() => {
    logout();
    setIsOpen(false);
  }, [logout]);

  // Language selector row
  const LanguageSelectorRow = () => (
    <div className="flex items-center justify-center rounded text-foreground">
      <div className="flex flex-1 items-center gap-1">
        <div className="flex h-6 items-center rounded-md bg-muted p-[2.4px]">
          <button
            onClick={() => handleLangChange('ar')}
            className={`flex items-center justify-center rounded px-1.5 py-0.5 text-[8.4px] font-medium transition-all ${
              currentLang === 'ar' ? 'bg-background' : 'bg-transparent'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => handleLangChange('en')}
            className={`flex items-center justify-center rounded px-1.5 py-0.5 text-[8.4px] font-medium transition-all ${
              currentLang === 'en' ? 'bg-background' : 'bg-transparent'
            }`}
          >
            الإنجليزية
          </button>
        </div>
        <div className="flex flex-1 flex-col text-sm font-normal">
          <p className="text-right leading-tight" dir="auto">
            اللغة
          </p>
        </div>
        <div className="flex items-center justify-end py-0 pr-0">
          <Languages className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );

  // Theme selector row
  const ThemeSelectorRow = () => (
    <div className="flex items-center justify-center rounded text-foreground">
      <div className="flex flex-1 items-center gap-1">
        <div className="flex h-6 items-center rounded-md bg-muted p-[2.4px]">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex items-center justify-center rounded px-1.5 py-0.5 text-[8.4px] font-medium transition-all ${
              currentTheme === 'light' ? 'bg-background' : 'bg-transparent'
            }`}
          >
            فاتح
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex items-center justify-center rounded px-1.5 py-0.5 text-[8.4px] font-medium transition-all ${
              currentTheme === 'dark' ? 'bg-background' : 'bg-transparent'
            }`}
          >
            داكن
          </button>
        </div>
        <div className="flex flex-1 flex-col text-sm font-normal">
          <p className="text-right leading-tight" dir="auto">
            المظهر
          </p>
        </div>
        <div className="flex items-center justify-end py-0 pr-0">
          <Palette className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );

  const dropdownItems: t.MenuItemProps[] = [
    {
      label: 'حسابي',
      render: () => (
        <div className="flex items-center justify-center rounded">
          <div className="flex flex-1 flex-col text-xs font-semibold text-sidebar-foreground">
            <p className="text-right leading-tight">حسابي</p>
          </div>
        </div>
      ),
      hideOnClick: false,
    },
    { separate: true },
    {
      render: () => <LanguageSelectorRow />,
      hideOnClick: false,
    },
    { separate: true },
    {
      render: () => <ThemeSelectorRow />,
      hideOnClick: false,
    },
    { separate: true },
    {
      render: () => (
        <div className="flex items-center justify-between text-sm text-sidebar-foreground">
          <button onClick={handleLogout} className="flex-1 bg-transparent">
            <LogOut className="h-3.5 w-3.5" />
          </button>
          <span>الخروج</span>
        </div>
      ),
    },
  ];

  const trigger = (
    <Ariakit.MenuButton className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 transition-opacity hover:opacity-80 dark:bg-gray-700">
      {!showFallback && avatarUrl ? (
        <img
          src={avatarUrl}
          alt={userName}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <UserIcon />
        </div>
      )}
    </Ariakit.MenuButton>
  );

  return (
    <DropdownPopup
      trigger={trigger}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      menuId="profile-dropdown"
      items={dropdownItems}
      portal={true}
      sameWidth={false}
      gutter={8}
      placement="bottom-start"
      className="w-64 rounded-md border border-border bg-sidebar-background"
      itemClassName="px-2 py-1.5"
    />
  );
}
