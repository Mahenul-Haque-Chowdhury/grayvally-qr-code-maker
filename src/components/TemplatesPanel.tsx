import type { Template } from '@/lib/templates';
import { IconCheck, IconTemplate, IconPlus, IconMinus } from '@/components/Icons';
import { useState } from 'react';

type Props = {
  templates: Template[];
  onApply: (templateId: string) => void;
  compact?: boolean;
};

export default function TemplatesPanel({ templates, onApply, compact }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleApply = (templateId: string) => {
    setActiveId(templateId);
    onApply(templateId);
  };

  if (compact) {
    return (
      <div className="mt-2 flex flex-nowrap items-center gap-2">
        {templates.map((template) => {
          const isActive = activeId === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleApply(template.id)}
              className={`flex min-w-[72px] flex-col items-center justify-center rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-slate-600 transition ${
                isActive ? 'border-brand-400 ring-2 ring-brand-100 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: template.style.fgColor || '#000' }} />
              </span>
              <span className="mt-1 block">{template.name}</span>
              {isActive && (
                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                  <IconCheck className="h-3 w-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section className="card px-4 py-5 sm:px-6 sm:py-6">
      <div className="flex items-center justify-between">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <IconTemplate className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Templates</h2>
            <p className="text-sm text-slate-500 hidden sm:block">Quick style presets</p>
          </div>
        </div>

        <button type="button" className="btn btn-ghost btn-icon" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? <IconMinus className="h-4 w-4" /> : <IconPlus className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-nowrap items-stretch gap-2 overflow-x-auto pb-1">
          {templates.map((template) => {
            const isActive = activeId === template.id;
            return (
              <button
                key={template.id}
                type="button"
                className={`group relative ${
                  'min-w-[140px] rounded-xl p-3 sm:p-4'
                } border bg-white text-left transition-all duration-200 ${
                  isActive ? 'border-brand-400 ring-2 ring-brand-100 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => handleApply(template.id)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="color-swatch h-6 w-6 rounded-lg border-2 border-white shadow"
                    style={{ backgroundColor: template.style.fgColor || '#000000' }}
                  />
                  <div
                    className="color-swatch h-6 w-6 rounded-lg border-2 border-slate-200 shadow"
                    style={{ backgroundColor: template.style.bgColor || '#ffffff' }}
                  />
                  {template.style.gradient?.enabled && (
                    <>
                      <div
                        className="color-swatch h-6 w-6 rounded-lg border-2 border-white shadow"
                        style={{ backgroundColor: template.style.gradient.color1 || '#2563eb' }}
                      />
                      <div
                        className="color-swatch h-6 w-6 rounded-lg border-2 border-white shadow"
                        style={{ backgroundColor: template.style.gradient.color2 || '#7c3aed' }}
                      />
                    </>
                  )}
                </div>

                <p className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors truncate">
                  {template.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 hidden sm:block">{template.description}</p>

                {isActive && (
                  <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                    <IconCheck className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
