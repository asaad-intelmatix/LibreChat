import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Ariakit from '@ariakit/react';
import { ChevronsUpDown, Undo2 } from 'lucide-react';
import { DropdownPopup } from '@librechat/client';
import type * as t from '~/common';
import { useLocalize } from '~/hooks';

type Worker = {
  id: 'muneera' | 'haitham';
  name: string;
  title: string;
  image: string;
};

export default function WorkerSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const localize = useLocalize();

  const workers: Worker[] = [
    {
      id: 'muneera',
      name: localize('com_ui_muneera'),
      title: localize('com_ui_muneera_title'),
      image: '/assets/muneera-welcome.png',
    },
    {
      id: 'haitham',
      name: localize('com_ui_haitham'),
      title: localize('com_ui_haitham_title'),
      image: '/assets/haitham-welcom.png',
    },
  ];

  // Determine current worker from path
  const currentWorkerId = location.pathname.includes('/muneera')
    ? 'muneera'
    : location.pathname.includes('/haitham')
      ? 'haitham'
      : null;

  const currentWorker = workers.find((w) => w.id === currentWorkerId);

  const handleWorkerSelect = (workerId: 'muneera' | 'haitham') => {
    navigate(`/workers/${workerId}`);

    setIsOpen(false);
  };

  const handleGoHome = () => {
    navigate('/');
    setIsOpen(false);
  };

  const dropdownItems: t.MenuItemProps[] = workers.map((worker) => ({
    label: worker.name,
    render: () => (
      <button
        onClick={() => handleWorkerSelect(worker.id)}
        type="button"
        key={`worker-selector-${worker.id}`}
        className={`flex w-full items-center gap-2 rounded px-2 py-2 transition-colors ${
          currentWorkerId === worker.id ? 'bg-sidebar-background' : 'bg-transparent hover:bg-muted'
        }`}
      >
        <div className="flex flex-1 flex-col items-start text-sidebar-foreground">
          <span className="text-left text-sm font-semibold rtl:text-right">{worker.name}</span>
          <span className="text-left text-xs rtl:text-right">{worker.title}</span>
        </div>
        <div className="relative h-8 w-8 overflow-hidden rounded-lg">
          <img
            src={worker.image}
            alt={worker.name}
            className="absolute inset-0 size-full max-w-none object-cover"
          />
        </div>
      </button>
    ),
    hideOnClick: false,
  }));

  // Add separator and "Return to main page" option
  dropdownItems.push({ separate: true });
  dropdownItems.push({
    label: localize('com_ui_return_to_main_page'),
    icon: <Undo2 className="h-3.5 w-3.5" />,
    onClick: handleGoHome,
  });

  const trigger = (
    <Ariakit.MenuButton className="flex h-12 items-center gap-2 rounded-md bg-sidebar-background px-2 py-2 text-sidebar-foreground transition-colors">
      {currentWorker ? (
        <>
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#887852_0%,rgba(136,120,82,0.30)_100%)] shadow-sm">
            <img
              src={currentWorker.image}
              alt={currentWorker.name}
              className="absolute inset-0 size-full max-w-none object-cover opacity-70"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-sidebar-foreground">
              {currentWorker.name}
            </span>
            <span className="text-xs">{currentWorker.title}</span>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-[11.2px] bg-[linear-gradient(135deg,#887852_0%,rgba(136,120,82,0.30)_100%)]"></div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold">RCMC</span>
            <span className="text-xs">{localize('com_ui_digital_workers_platform')}</span>
          </div>
        </div>
      )}
      <ChevronsUpDown className="h-4 w-4" />
    </Ariakit.MenuButton>
  );

  return (
    <DropdownPopup
      trigger={trigger}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      menuId="worker-selector-dropdown"
      items={dropdownItems}
      portal={true}
      sameWidth={false}
      gutter={8}
      placement="bottom-start"
      className="w-64 rounded-md border border-border !bg-background"
      itemClassName="px-2 py-2 text-sidebar-foreground"
    />
  );
}
