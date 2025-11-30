import { useEffect, useRef } from 'react';
import { useAuthContext } from '~/hooks/AuthContext';

export default function HaithamWelcomePage() {
  const { user } = useAuthContext();
  const userName = user?.name || user?.username || 'خالد';
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Play video only once when component first mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  }, []);
  return (
    <div className="flex min-h-full items-center justify-center px-40 py-24">
      <div className="flex w-full max-w-[1432px] items-center justify-between">
        {/* Left side - Image circles */}
        <div className="relative">
          <div className="absolute size-[533.023px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(125, 113, 80, 0.50) 0%, rgba(125, 113, 80, 0.10) 100%)',
              }}
            />
          </div>
          <div className="absolute left-[23.92px] top-[21.36px] size-[489.459px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(125, 113, 80, 0.20) 0%, rgba(125, 113, 80, 0.04) 100%)',
              }}
            />
          </div>
          <div className="relative left-[38.44px] top-[38.44px] size-[456.145px]">
            <video
              ref={videoRef}
              src="/assets/meet-haitham.mp4"
              className="size-full rounded-full object-cover"
              playsInline
              loop={false}
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

          <div className="flex justify-end gap-[14px]">
            <button className="flex h-14 items-center justify-center rounded-lg border border-gray-200 bg-white px-[22.4px] py-[11.2px] text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              محادثة
            </button>
            <button className="flex h-14 items-center justify-center rounded-lg border border-gray-200 bg-white px-[22.4px] py-[11.2px] text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              مركز الحوادث
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
