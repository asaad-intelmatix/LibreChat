import { Outlet, useOutletContext } from 'react-router-dom';
import ProfileComponent from '../../components/DigitalWorkers/ProfileComponent';
import WorkerSelector from '../../components/DigitalWorkers/WorkerSelector';
import { useEffect } from 'react';
import { ContextType } from '~/common';

export default function WorkerLayout() {
  const { setNavVisible } = useOutletContext() satisfies ContextType;
  useEffect(() => {
    setNavVisible(true);
  }, []);
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="flex flex-grow">
        <div className="flex w-full flex-col">
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between gap-3">
            <ProfileComponent />
            <WorkerSelector />
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className=""></footer>
        </div>
      </div>
    </div>
  );
}
