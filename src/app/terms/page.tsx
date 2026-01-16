import { IconInfo, IconCheckCircle } from '@/components/Icons';

const TERMS = [
  { title: 'As-Is Service', description: 'This tool is provided without warranties. You are responsible for ensuring QR codes work correctly for your use case.', icon: '📋' },
  { title: 'Lawful Use', description: 'By using this service, you agree not to upload or encode unlawful content.', icon: '⚖️' },
  { title: 'No Liability', description: 'GrayVally Software Solutions assumes no liability for misuse or damages.', icon: '🛡️' }
];

export default function TermsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <section className="card-glow px-4 py-6 sm:px-6 sm:py-8">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-slate-600 to-slate-800 text-white">
            <IconInfo className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Terms of Service</h1>
            <p className="text-sm text-slate-500">Clear, simple, fair</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {TERMS.map((term) => (
            <div 
              key={term.title} 
              className="flex items-start gap-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 p-4 transition-all duration-200 hover:shadow-md hover:border-slate-200"
            >
              <span className="text-2xl">{term.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-900">{term.title}</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{term.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-brand-50 border border-brand-200/50 px-4 py-3">
          <IconCheckCircle className="h-5 w-5 text-brand-600" />
          <p className="text-sm text-brand-700 font-medium">By using this tool, you accept these terms.</p>
        </div>
      </section>
    </div>
  );
}
