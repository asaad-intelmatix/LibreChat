import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalize } from '~/hooks';
import { useAuthContext } from '~/hooks/AuthContext';

export default function MuneeraWelcomePage() {
  const { user } = useAuthContext();
  const userName = user?.name || user?.username;
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const localize = useLocalize();
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
        {/* Content */}
        <div className="flex w-[561px] flex-col gap-12 text-end">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-[30px] font-semibold leading-[36px] tracking-[-0.225px] text-foreground">
              {localize('com_ui_welcome')} {userName}
            </h2>
            <h3 className="text-[24px] font-semibold leading-[32px] tracking-[-0.144px] text-muted-foreground">
              {localize('com_ui_how_can_i_help_you')}
            </h3>
          </div>

          <div className="flex gap-[14px]">
            {/* <button className="flex h-14 items-center justify-center rounded-lg border border-border bg-background px-[22.4px] py-[11.2px] text-sm font-medium text-foreground transition-colors hover:bg-sidebar-background hover:text-sidebar-foreground">
              xxx
            </button> */}
            <button
              onClick={() => navigate('/workers/muneera/chat')}
              className="flex h-14 items-center justify-center rounded-lg border border-border bg-background px-[22.4px] py-[11.2px] text-sm font-medium text-foreground transition-colors hover:bg-sidebar-background hover:text-sidebar-foreground"
            >
              {localize('com_ui_chat')}
            </button>
          </div>
        </div>

        {/*  Image circles */}
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
          <div className="absolute top-[21.36px] size-[489.459px] ltr:left-[23.92px] rtl:right-[23.92px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(125, 113, 80, 0.20) 0%, rgba(125, 113, 80, 0.04) 100%)',
              }}
            />
          </div>
          <div className="relative top-[38.44px] size-[456.145px] ltr:left-[38.44px] rtl:right-[38.44px]">
            <video
              ref={videoRef}
              src="/assets/meet-muneera.mp4"
              className="size-full rounded-full object-cover"
              playsInline
              loop={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
