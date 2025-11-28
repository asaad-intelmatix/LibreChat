import { Outlet } from 'react-router-dom';
import { useAuthContext } from '~/hooks/AuthContext';
import ProfileComponent from '../../components/DigitalWorkers/ProfileComponent';
import WorkerSelector from '../../components/DigitalWorkers/WorkerSelector';

export default function WorkerLayout() {
  const { user } = useAuthContext();

  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <div className="flex flex-grow">
        <div className="flex w-full flex-col">
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-10 py-6 dark:border-gray-700 dark:bg-gray-800">
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
