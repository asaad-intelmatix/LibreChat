import { Outlet, useLocation } from 'react-router-dom';
import ProfileComponent from './ProfileComponent';
import WorkerSelector from './WorkerSelector';
import NavLinks from './NavLinks';

export default function WelcomeLayout() {
  const location = useLocation();

  // Determine which worker is active based on the path
  const currentWorker = location.pathname.includes('/workers/muneera')
    ? 'muneera'
    : location.pathname.includes('/workers/haitham')
      ? 'haitham'
      : null;

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between gap-3 bg-background px-10 py-6">
        <ProfileComponent />
        <div className="flex items-center gap-4">
          <NavLinks workerId={currentWorker} />
          <WorkerSelector />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer with Logo */}
      <footer className="flex justify-end px-10 py-6">
        <div className="h-[58px] w-[194.3px]">
          <img
            src="/assets/rcmc-logo.svg"
            alt="Royal Commission for Makkah City and Holy Sites"
            className="h-full w-full object-contain"
          />
        </div>
      </footer>
    </div>
  );
}
