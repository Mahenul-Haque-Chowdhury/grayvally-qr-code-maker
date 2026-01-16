import { useEffect, useMemo, useRef } from 'react';
import type { Options } from 'qr-code-styling';
import { IconCheckCircle, IconEye, IconQr } from '@/components/Icons';
import { cn } from '@/lib/utils';
import type { QrState } from '@/types/qr';

type Props = {
  payload: string;
  options: Options;
  frame: QrState['style']['frame'];
  valid: boolean;
  errors: Record<string, string>;
};

export default function PreviewCard({ payload, options, frame, valid, errors }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<unknown>(null);

  const errorList = useMemo(() => Object.values(errors).filter(Boolean), [errors]);

  useEffect(() => {
    let active = true;

    async function renderQr() {
      const { default: QRCodeStyling } = await import('qr-code-styling');
      if (!active) return;

      if (!qrRef.current) {
        qrRef.current = new QRCodeStyling(options);
      } else {
        (qrRef.current as { update: (options: Options) => void }).update(options);
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        (qrRef.current as { append: (element: HTMLElement) => void }).append(
          containerRef.current,
        );
      }
    }

    void renderQr();
    return () => {
      active = false;
    };
  }, [options]);

  return (
    <section className="card-glow px-4 py-4 sm:px-5 sm:py-5 lg:px-4 lg:py-3">
      <div className="flex items-center justify-between">
        <div className="section-header">
          <div className="section-icon-brand lg:h-9 lg:w-9">
            <IconEye className="h-5 w-5 lg:h-4 lg:w-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 lg:text-base">Live Preview</h2>
            <p className="text-sm text-slate-500 lg:text-xs">
              Real-time rendering
            </p>
          </div>
        </div>
        <span className={cn(
          'badge flex items-center gap-1.5 transition-all duration-300 lg:text-[10px] lg:px-2 lg:py-1',
          valid ? 'badge-success' : 'badge-error'
        )}>
          {valid ? (
            <>
              <IconCheckCircle className="h-3.5 w-3.5 lg:h-3 lg:w-3" />
              Ready
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Fix errors
            </>
          )}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 sm:p-6 border border-slate-200/50 lg:mt-2 lg:p-3">
        {(() => {
          const labelTop = frame?.style === 'scan-top';
          const labelBottom = frame?.style === 'scan-bottom';
          const showFrame = frame?.style && frame.style !== 'none';
          const labelHeight = Math.max(32, Math.round(((options.width as number) || 320) * 0.12));
          const framePadding = frame?.padding ?? 0;

          return (
            <div
              className={cn(
                'relative flex items-center justify-center transition-all duration-300',
                showFrame && 'rounded-3xl border bg-white shadow-lg',
              )}
              style={{
                borderColor: frame?.borderColor,
                backgroundColor: frame?.backgroundColor,
                padding: framePadding,
                paddingTop: framePadding + (labelTop ? labelHeight : 0),
                paddingBottom: framePadding + (labelBottom ? labelHeight : 0),
                borderRadius: frame?.radius
              }}
            >
              {labelTop && (
                <div
                  className="absolute left-4 right-4 top-3 flex items-center justify-center rounded-full text-xs font-bold tracking-wide uppercase"
                  style={{
                    backgroundColor: frame?.labelBg,
                    color: frame?.labelColor,
                    height: labelHeight - 12
                  }}
                >
                  {frame?.label || 'SCAN ME'}
                </div>
              )}
              {labelBottom && (
                <div
                  className="absolute bottom-3 left-4 right-4 flex items-center justify-center rounded-full text-xs font-bold tracking-wide uppercase"
                  style={{
                    backgroundColor: frame?.labelBg,
                    color: frame?.labelColor,
                    height: labelHeight - 12
                  }}
                >
                  {frame?.label || 'SCAN ME'}
                </div>
              )}
              <div ref={containerRef} aria-label="QR code preview" className="rounded-lg overflow-hidden" />
            </div>
          );
        })()}
      </div>

      <div className="mt-4 lg:mt-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide lg:text-[10px]">
          <IconQr className="h-3.5 w-3.5 lg:h-3 lg:w-3" />
          Payload Data
        </div>
        <div className="mt-2 rounded-xl bg-slate-900 px-4 py-3 font-mono text-xs text-slate-300 overflow-x-auto max-h-16 lg:mt-1 lg:px-3 lg:py-2 lg:text-[11px] lg:max-h-10">
          {payload || <span className="text-slate-500 italic">Your payload will appear here...</span>}
        </div>
        {!valid && errorList.length > 0 && (
          <div className="mt-3 space-y-1.5 animate-fade-in lg:mt-2">
            {errorList.map((item, index) => (
              <p key={`${item}-${index}`} className="flex items-center gap-2 text-xs text-red-500 lg:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
