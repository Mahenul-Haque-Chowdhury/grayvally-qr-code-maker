'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ExportPanel from '@/components/ExportPanel';
import GeneratorForm from '@/components/GeneratorForm';
import HistoryPanel from '@/components/HistoryPanel';
import PreviewCard from '@/components/PreviewCard';
import ScanTips from '@/components/ScanTips';
import TemplatesPanel from '@/components/TemplatesPanel';
import Toasts from '@/components/Toasts';
import { IconDownload, IconLock, IconShield, IconSparkles } from '@/components/Icons';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToasts } from '@/hooks/useToasts';
import { DEFAULT_STATE } from '@/lib/defaults';
import { buildPayload, sanitizeFields, validateFields } from '@/lib/payload';
import { buildQrOptions, createPaddedLogoDataUrl } from '@/lib/qr';
import { decodeShareState, encodeShareState, buildShareUrl } from '@/lib/share';
import { TEMPLATES } from '@/lib/templates';
import { buildFileName } from '@/lib/utils';
import type { HistoryItem, QrState } from '@/types/qr';

const HISTORY_KEY = 'grayvally-qr-history';

function HomePageContent() {
  const [state, setState] = useState<QrState>(DEFAULT_STATE);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(HISTORY_KEY, []);
  const { toasts, pushToast, dismissToast } = useToasts();
  const searchParams = useSearchParams();
  const hydratedRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const payload = useMemo(
    () => buildPayload(state.type, state.fields),
    [state.type, state.fields],
  );
  const validation = useMemo(
    () => validateFields(state.type, state.fields),
    [state.type, state.fields],
  );
  const debouncedPayload = useDebouncedValue(payload, 350);
  const debouncedStyle = useDebouncedValue(state.style, 150);
  const [generatedPayload, setGeneratedPayload] = useState<string>(payload);

  useEffect(() => {
    if (!hydratedRef.current) {
      const encoded = searchParams.get('s');
      if (encoded) {
        const decoded = decodeShareState(encoded);
        if (decoded) {
          setState(decoded);
          setGeneratedPayload(buildPayload(decoded.type, decoded.fields));
          pushToast('Share link loaded.');
        } else {
          pushToast('Share link could not be decoded.');
        }
      }
      hydratedRef.current = true;
    }
  }, [searchParams, pushToast]);

  useEffect(() => {
    let active = true;

    async function buildPaddedLogo() {
      const logo = state.style.logo;
      if (!logo.enabled || !logo.dataUrl || !logo.paddingEnabled || logo.padding <= 0) {
        if (logo.paddedDataUrl) {
          setState((prev) => ({
            ...prev,
            style: {
              ...prev.style,
              logo: {
                ...prev.style.logo,
                paddedDataUrl: null
              }
            }
          }));
        }
        return;
      }

      try {
        const padded = await createPaddedLogoDataUrl(
          logo.dataUrl,
          logo.padding,
          state.style.backgroundTransparent ? 'rgba(0,0,0,0)' : state.style.bgColor,
        );
        if (active) {
          setState((prev) => ({
            ...prev,
            style: {
              ...prev.style,
              logo: {
                ...prev.style.logo,
                paddedDataUrl: padded
              }
            }
          }));
        }
      } catch {
        if (active) {
          pushToast('Logo padding failed. Using original logo.');
        }
      }
    }

    void buildPaddedLogo();
    return () => {
      active = false;
    };
  }, [state.style.logo, state.style.bgColor, state.style.backgroundTransparent, pushToast]);

  useEffect(() => {
    setGeneratedPayload((prev) => (prev ? prev : payload));
  }, [payload]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(min-width: 1024px)');
    const handleChange = (matches: boolean) => {
      setIsDesktop(matches);
    };
    handleChange(media.matches);
    const listener = (event: MediaQueryListEvent) => handleChange(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const previewSize = isDesktop
    ? Math.min(280, debouncedStyle.size)
    : Math.min(240, debouncedStyle.size);
  const previewOptions = useMemo(
    () => buildQrOptions({ ...state, style: debouncedStyle }, debouncedPayload, previewSize),
    [state.type, state.fields, debouncedStyle, debouncedPayload, previewSize],
  );

  const handleGenerate = () => {
    if (!validation.valid) {
      pushToast('Please fix validation errors before generating.');
      return;
    }

    const nextPayload = payload;
    setGeneratedPayload(nextPayload);
    const item: HistoryItem = {
      id: crypto.randomUUID(),
      type: state.type,
      fields: sanitizeFields(state.fields),
      style: state.style,
      payload: nextPayload,
      timestamp: Date.now(),
      starred: false
    };
    setHistory((prev) => [item, ...prev].slice(0, 20));
    pushToast('QR code generated and saved to history.');
  };

  const handleReset = () => {
    setState(DEFAULT_STATE);
    setGeneratedPayload(buildPayload(DEFAULT_STATE.type, DEFAULT_STATE.fields));
    pushToast('Reset to default settings.');
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = TEMPLATES.find((item) => item.id === templateId);
    if (!template) return;
    setState((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        ...template.style,
        logo: {
          ...prev.style.logo,
          ...(template.style.logo ?? {})
        },
        gradient: {
          ...prev.style.gradient,
          ...(template.style.gradient ?? {})
        },
        frame: {
          ...prev.style.frame,
          ...(template.style.frame ?? {})
        }
      }
    }));
    pushToast(`Applied template: ${template.name}`);
  };

  const handleRestore = (item: HistoryItem) => {
    const normalizedStyle = {
      ...DEFAULT_STATE.style,
      ...item.style,
      gradient: { ...DEFAULT_STATE.style.gradient, ...item.style?.gradient },
      logo: { ...DEFAULT_STATE.style.logo, ...item.style?.logo },
      frame: { ...DEFAULT_STATE.style.frame, ...item.style?.frame }
    };
    setState({
      ...state,
      type: item.type,
      fields: item.fields,
      style: normalizedStyle
    });
    setGeneratedPayload(item.payload);
    pushToast('History item restored.');
  };

  const handleToggleStar = (itemId: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, starred: !item.starred } : item)),
    );
  };

  const encodedShare = useMemo(
    () => encodeShareState(state, state.includeSensitive),
    [state],
  );
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!encodedShare) {
      setShareUrl(null);
      return;
    }
    setShareUrl(buildShareUrl(encodedShare));
  }, [encodedShare]);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:pr-[392px] xl:pr-[456px] 2xl:pr-[500px] lg:pb-4">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {/* Hero Section */}
        <section className="card-glow px-4 py-6 sm:px-6 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="badge badge-brand">
                  <IconSparkles className="h-3.5 w-3.5" />
                  GrayVally Software
                </span>
                <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                  <IconLock className="h-3 w-3" />
                  100% Private
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
                QR Code Generator
              </h1>
              <p className="text-base text-slate-600 leading-relaxed">
                Create stunning, scannable QR codes with advanced styling, gradients, logos, and frames. Export in multiple formats instantly.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:flex lg:gap-4">
              <div className="feature-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/20">
                  <IconDownload className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">Crisp Exports</p>
                <p className="mt-1 text-xs text-slate-500">PNG, SVG, PDF</p>
              </div>
              <div className="feature-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20">
                  <IconSparkles className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">Full Control</p>
                <p className="mt-1 text-xs text-slate-500">Gradients & Logos</p>
              </div>
              <div className="feature-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                  <IconShield className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">Private</p>
                <p className="mt-1 text-xs text-slate-500">100% Local</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <GeneratorForm
              state={state}
              errors={validation.errors}
              onStateChange={setState}
              onGenerate={handleGenerate}
              onReset={handleReset}
            />
            <TemplatesPanel templates={TEMPLATES} onApply={handleApplyTemplate} />
            <HistoryPanel
              history={history}
              onRestore={handleRestore}
              onToggleStar={handleToggleStar}
            />
            <ScanTips />
          </div>

          <div className="flex flex-col gap-6 lg:hidden">
            <PreviewCard
              payload={debouncedPayload}
              options={previewOptions}
              frame={state.style.frame}
              valid={validation.valid}
              errors={validation.errors}
            />
            <ExportPanel
              payload={generatedPayload}
              state={state}
              valid={validation.valid}
              filename={buildFileName(state.type)}
              shareUrl={shareUrl}
              onNotify={pushToast}
            />
          </div>
        </div>

        {/* Privacy Footer */}
        <section className="card px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <IconLock className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">Privacy First</h2>
              <p className="text-sm text-slate-500">Your data never leaves your browser</p>
            </div>
            <span className="badge badge-success hidden sm:flex">
              <IconShield className="h-3 w-3" />
              Verified Local
            </span>
          </div>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            We don&apos;t send your data to any server. All QR generation, exports, and history
            are processed and stored locally in your browser. Your privacy is guaranteed.
          </p>
        </section>

        <Toasts toasts={toasts} onDismiss={dismissToast} />
      </div>

      <aside className="hidden lg:fixed lg:top-20 lg:right-[calc((100vw-1440px)/2+16px)] lg:flex lg:w-[360px] xl:w-[420px] 2xl:w-[460px] lg:flex-col lg:gap-3">
        <PreviewCard
          payload={debouncedPayload}
          options={previewOptions}
          frame={state.style.frame}
          valid={validation.valid}
          errors={validation.errors}
        />
        <ExportPanel
          payload={generatedPayload}
          state={state}
          valid={validation.valid}
          filename={buildFileName(state.type)}
          shareUrl={shareUrl}
          onNotify={pushToast}
        />
      </aside>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={<div className="card-glow px-6 py-8 sm:py-10">Loading...</div>}
    >
      <HomePageContent />
    </Suspense>
  );
}
