import type { Template } from '@/lib/templates';
import { IconCheck, IconTemplate } from '@/components/Icons';
import { useState } from 'react';

type Props = {
  templates: Template[];
  onApply: (templateId: string) => void;
};

export default function TemplatesPanel({ templates, onApply }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleApply = (templateId: string) => {
    setActiveId(templateId);
    onApply(templateId);
  };

  return (
    <section className="card px-4 py-5 sm:px-6 sm:py-6">
      <div className="flex items-center justify-between">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <IconTemplate className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Templates</h2>
            <p className="text-sm text-slate-500">Quick style presets</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-nowrap items-stretch gap-2 overflow-x-auto pb-1">
        {templates.map((template) => {
          const isActive = activeId === template.id;
          return (
            <button
              key={template.id}
              type="button"
              className={`group relative min-w-[180px] rounded-xl border bg-white p-4 text-left transition-all duration-200 hover:shadow-lg sm:min-w-[220px] ${
                isActive 
                  ? 'border-brand-400 ring-2 ring-brand-100 shadow-md' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => handleApply(template.id)}
            >
              {/* Color preview */}
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

              <p className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                {template.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{template.description}</p>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                  <IconCheck className="h-3 w-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
