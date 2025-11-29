import { Outlet } from 'react-router-dom';
import { useAuthContext } from '~/hooks/AuthContext';
import ProfileComponent from '../../components/DigitalWorkers/ProfileComponent';
import WorkerSelector from '../../components/DigitalWorkers/WorkerSelector';

export default function WorkerLayout() {
  const { user } = useAuthContext();

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
