import { useAuthContext } from '~/hooks/AuthContext';

export default function MuneeraWelcomePage() {
  const { user } = useAuthContext();
  const userName = user?.name || user?.username || 'أحمد';

  return (
    <div className="flex min-h-full items-center justify-center px-40 py-24">
      <div className="flex w-full max-w-[1432px] items-center justify-between">
        {/* Left side - Image circles */}
        <div className="relative">
          <div className="absolute size-[533px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 opacity-30 dark:from-indigo-900 dark:to-indigo-800" />
          </div>
          <div className="absolute left-[24px] top-[21px] size-[489px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 opacity-40 dark:from-indigo-800 dark:to-indigo-700" />
          </div>
          <div className="relative left-[38px] top-[38px] size-[456px]">
            <img
              src="http://localhost:3845/assets/c6f8818ab33fdc858cf3aa544b8a9e11000ed8cc.png"
              alt="Muneera"
              className="size-full object-contain"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex w-[561px] flex-col gap-12 text-right">
          <div className="flex flex-col gap-2">
            <h2 className="text-[30px] font-semibold leading-[36px] tracking-[-0.225px] text-gray-900 dark:text-white">
              مرحبا {userName}
            </h2>
            <h3 className="text-[24px] font-semibold leading-[32px] tracking-[-0.144px] text-gray-500 dark:text-gray-400">
              كيف أستطيع أن أساعدك؟
            </h3>
          </div>

          <div className="flex gap-[14px] justify-end">
            <button className="flex h-14 items-center justify-center rounded-lg border border-gray-200 bg-white px-[22.4px] py-[11.2px] text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              xxx
            </button>
            <button className="flex h-14 items-center justify-center rounded-lg border border-gray-200 bg-white px-[22.4px] py-[11.2px] text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              محدثات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

