import { useNavigate } from 'react-router-dom';

type Worker = {
  id: 'muneera' | 'haitham';
  name: string;
  title: string;
  image: string;
};

const workers: Worker[] = [
  {
    id: 'muneera',
    name: 'منيرة',
    title: 'محلل التميز في الأداء',
    image: '/assets/muneera-welcome.png',
  },
  {
    id: 'haitham',
    name: 'هيثم',
    title: 'مراقب الأداء والاستجابة',
    image: '/assets/haitham-welcom.png',
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
          <h1 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            العاملين الرقميّين
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">تعريف عام عن المنصة</p>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {workers.map((worker) => (
            <button
              key={worker.id}
              onClick={() => handleWorkerSelect(worker.id)}
              className="group flex flex-col items-start rounded-md border border-gray-200 bg-white transition-all hover:border-indigo-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-400"
            >
              <div className="relative h-[333px] w-full overflow-hidden rounded-t-md bg-gray-100 dark:bg-gray-700">
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="absolute inset-0 max-w-none object-contain"
                  style={{
                    height: worker.id === 'muneera' ? '104.27%' : '130.08%',
                    left: worker.id === 'muneera' ? '27.82%' : '24.98%',
                    top: worker.id === 'muneera' ? '11.42%' : '0%',
                    width: worker.id === 'muneera' ? '43.11%' : '50.03%',
                  }}
                />
              </div>
              <div className="w-full p-3 text-right">
                <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {worker.name}
                </h2>
                <p className="text-base text-gray-500 dark:text-gray-400">{worker.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
