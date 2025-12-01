import { Outlet, useLocation, Navigate } from 'react-router-dom';
import ProfileComponent from './ProfileComponent';
import WorkerSelector from './WorkerSelector';
import NavLinks from './NavLinks';
import { ThemeContext, isDark } from '@librechat/client';
import { useContext } from 'react';
import { useAuthContext } from '~/hooks';

export default function WelcomeLayout() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useAuthContext();

  const isDarkTheme = isDark(theme);
  // Determine which worker is active based on the path
  const currentWorker = location.pathname.includes('/workers/muneera')
    ? 'muneera'
    : location.pathname.includes('/workers/haitham')
      ? 'haitham'
      : null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between gap-3 bg-background px-10 py-6">
        <div className="flex items-center gap-4">
          <WorkerSelector />
          <NavLinks workerId={currentWorker} />
        </div>
        <ProfileComponent />
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer with Logo */}
      <footer className="flex px-10 py-6">
        <div className="h-[58px] w-[194.3px]">
          <img
            src={isDarkTheme ? '/assets/rcmc-logo-dark-theme.svg' : '/assets/rcmc-logo.svg'}
            alt="Royal Commission for Makkah City and Holy Sites"
            className="h-full w-full object-contain"
          />
        </div>
      </footer>
    </div>
  );
}
