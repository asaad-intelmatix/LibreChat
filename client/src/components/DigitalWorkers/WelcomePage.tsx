import { useNavigate } from 'react-router-dom';

type Worker = {
  id: 'muneera' | 'haitham';
  name: string;
  title: string;
  image: string;
};

const workers: Worker[] = [
  {
    id: 'haitham',
    name: 'هيثم',
    title: 'مراقب الأداء والاستجابة',
    image: '/assets/haitham-welcom.png',
  },
  {
    id: 'muneera',
    name: 'منيرة',
    title: 'محلل التميز في الأداء',
    image: '/assets/muneera-welcome.png',
  },
];

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleWorkerSelect = (workerId: 'muneera' | 'haitham') => {
    navigate(`/workers/${workerId}`);
  };

  return (
    <div className="flex flex-grow items-center justify-center px-10 py-24">
      <div className="w-full max-w-[1432px]">
        {/* Header Section */}
        <div className="mb-8 text-right">
          <h1 className="mb-2 text-lg font-medium text-foreground">العاملين الرقميّين</h1>
          <p className="text-sm text-muted-foreground">تعريف عام عن المنصة</p>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {workers.map((worker) => (
            <button
              key={worker.id}
              onClick={() => handleWorkerSelect(worker.id)}
              className="group flex flex-col items-start rounded-md bg-background transition-all hover:shadow-lg dark:hover:shadow-gray-700"
            >
              <div className="relative h-[333px] w-full overflow-hidden rounded-t-md bg-gray-100 dark:bg-gray-700">
                <img
                  src={worker.image}
                  alt={worker.name}
                  className={`absolute inset-0 ${worker.id === 'muneera' ? 'top-[11.42%] h-[104.27%] w-[43.11%] ltr:left-[27.82%] rtl:right-[27.82%]' : 'top-0 h-[130.08%] w-[50.03%] ltr:left-[24.98%] rtl:right-[24.98%]'} max-w-none object-contain`}
                />
              </div>
              <div className="w-full p-3 text-right">
                <h2 className="mb-1 text-xl font-semibold text-foreground">{worker.name}</h2>
                <p className="text-base text-muted-foreground">{worker.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
