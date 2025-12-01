import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

type NavLink = {
  label: string;
  path?: string;
  onClick?: () => void;
  showChevron?: boolean;
};

type NavLinksProps = {
  workerId: 'muneera' | 'haitham' | null;
};

// Define nav links for each worker
const muneeraLinks: NavLink[] = [
  // {
  //   label: 'xxx',
  //   path: '/workers/muneera/xxx', // Update with actual path
  //   showChevron: false,
  // },
  {
    label: 'محادثة',
    path: '/workers/muneera/chat', // Update with actual path
    showChevron: false,
  },
];

const haithamLinks: NavLink[] = [
  {
    label: 'محادثة',
    path: '/workers/haitham/chat', // Update with actual path
    showChevron: false,
  },
  {
    label: 'مركز الحوادث',
    path: '/workers/haitham/incidents', // Update with actual path
    showChevron: false,
  },
];

export default function NavLinks({ workerId }: NavLinksProps) {
  const navigate = useNavigate();

  // Show nav links only when a worker is selected
  if (!workerId) {
    return null;
  }

  const links = workerId === 'muneera' ? muneeraLinks : haithamLinks;

  const handleClick = (link: NavLink) => {
    if (link.path) {
      navigate(link.path);
    } else if (link.onClick) {
      link.onClick();
    }
  };

  return (
    <div className="flex items-center gap-4">
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => handleClick(link)}
          className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          <span>{link.label}</span>
          {link.showChevron && <ChevronDown className="h-3 w-3" />}
        </button>
      ))}
    </div>
  );
}
