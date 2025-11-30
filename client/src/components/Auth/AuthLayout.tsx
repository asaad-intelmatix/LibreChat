import { useContext } from 'react';
import { ThemeContext, ThemeSelector, isDark } from '@librechat/client';
import { TStartupConfig } from 'librechat-data-provider';
import { ErrorMessage } from '~/components/Auth/ErrorMessage';
import { TranslationKeys, useLocalize } from '~/hooks';
import SocialLoginRender from './SocialLoginRender';
import { BlinkAnimation } from './BlinkAnimation';
import { Banner } from '../Banners';
import Footer from './Footer';

function AuthLayout({
  children,
  header,
  isFetching,
  startupConfig,
  startupConfigError,
  pathname,
  error,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  isFetching: boolean;
  startupConfig: TStartupConfig | null | undefined;
  startupConfigError: unknown | null | undefined;
  pathname: string;
  error: TranslationKeys | null;
}) {
  const localize = useLocalize();
  const { theme } = useContext(ThemeContext);
  const darkMode = isDark(theme);

  const hasStartupConfigError = startupConfigError !== null && startupConfigError !== undefined;
  const DisplayError = () => {
    if (hasStartupConfigError) {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>{localize('com_auth_error_login_server')}</ErrorMessage>
        </div>
      );
    } else if (error === 'com_auth_error_invalid_reset_token') {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>
            {localize('com_auth_error_invalid_reset_token')}{' '}
            <a className="font-semibold text-green-600 hover:underline" href="/forgot-password">
              {localize('com_auth_click_here')}
            </a>{' '}
            {localize('com_auth_to_try_again')}
          </ErrorMessage>
        </div>
      );
    } else if (error != null && error) {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>{localize(error)}</ErrorMessage>
        </div>
      );
    }
    return null;
  };

  // Check if this is a login/register page that should use split layout
  const isAuthPage = pathname.includes('login') || pathname.includes('register');

  // Background image path - placeholder, user should replace with actual image
  const loginBackgroundImage = '/assets/auth-bg-1.png';

  if (isAuthPage) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background">
        <Banner />
        <DisplayError />
        <div className="absolute left-0 top-20 z-10 md:m-4">
          <ThemeSelector />
        </div>

        {/* Responsive split-screen layout */}
        <div className="flex h-screen max-h-screen flex-col overflow-hidden lg:flex-row">
          {/* Left side - Form container */}
          <div className="relative flex w-full max-w-full flex-1 items-center justify-center gap-4 bg-background">
            <div className="flex w-full flex-col items-center justify-center">
              {!hasStartupConfigError && !isFetching && header && (
                <h1
                  className="mb-4 text-center text-3xl font-semibold text-foreground"
                  style={{ userSelect: 'none' }}
                >
                  {header}
                </h1>
              )}
              {children}
              {!pathname.includes('2fa') &&
                (pathname.includes('login') || pathname.includes('register')) && (
                  <SocialLoginRender startupConfig={startupConfig} />
                )}
            </div>
          </div>

          {/* Right side - Image container */}
          <div className="relative hidden h-full max-h-screen flex-1 items-end overflow-hidden bg-[#c4ab79] p-6 lg:flex">
            <div className="relative flex h-full w-full flex-col items-end">
              <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                <img
                  src={loginBackgroundImage}
                  alt="clock-tower"
                  className="h-full w-full rounded-[20px] object-cover object-center"
                  onError={(e) => {
                    // Fallback to solid color if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Logo overlay */}
                <div className="pointer-events-none absolute right-[3%] top-[4%] h-[58px] w-[194.3px] overflow-hidden">
                  <img
                    src={'/assets/rcmc-logo.svg'}
                    alt="RCMC Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer startupConfig={startupConfig} /> */}
      </div>
    );
  }

  // Original layout for other auth pages (forgot-password, reset-password, etc.)
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Banner />
      <BlinkAnimation active={isFetching}>
        <div className="mt-6 h-10 w-full bg-cover">
          <img
            src="assets/logo.svg"
            className="h-full w-full object-contain"
            alt={localize('com_ui_logo', { 0: startupConfig?.appTitle ?? 'LibreChat' })}
          />
        </div>
      </BlinkAnimation>
      <DisplayError />
      <div className="absolute left-0 top-0 md:m-4">
        <ThemeSelector />
      </div>

      <div className="flex flex-grow items-center justify-center">
        <div className="w-authPageWidth overflow-hidden bg-background px-6 py-4 sm:max-w-md sm:rounded-lg">
          {!hasStartupConfigError && !isFetching && header && (
            <h1
              className="mb-4 text-center text-3xl font-semibold text-foreground"
              style={{ userSelect: 'none' }}
            >
              {header}
            </h1>
          )}
          {children}
          {!pathname.includes('2fa') &&
            (pathname.includes('login') || pathname.includes('register')) && (
              <SocialLoginRender startupConfig={startupConfig} />
            )}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
