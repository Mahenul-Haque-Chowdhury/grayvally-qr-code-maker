import type { Metadata } from 'next';
import { IconCheckCircle, IconShield } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'GrayVally QR Studio is local-first: your QR content never leaves your browser. Read how we handle data, local storage, and anonymous analytics.',
  alternates: {
    canonical: '/privacy'
  }
};

const FEATURES = [
  { title: 'Local Generation', description: 'QR codes are created entirely in your browser — content is never uploaded', icon: '🔒' },
  { title: 'Local Storage', description: 'Your history and preferences stay on your device', icon: '💾' },
  { title: 'No QR Data Collection', description: 'Links, WiFi passwords, and contacts you encode are never sent to a server', icon: '🏠' },
  { title: 'Anonymous Analytics', description: 'We use Google Analytics only for aggregate page-visit statistics — never your QR content', icon: '📊' }
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <section className="card-glow px-4 py-6 sm:px-6 sm:py-8">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <IconShield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-sm text-slate-500">Local-first by design</p>
          </div>
        </div>
        
        <p className="mt-5 text-sm text-slate-600 leading-relaxed">
          GrayVally Software Solutions does not collect, transmit, or store the content of your QR
          codes. Generation, exports, and history all happen locally in your browser. The only data
          we collect is anonymous, aggregate page-visit statistics via Google Analytics — never the
          links, passwords, or contact details you encode.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div 
              key={feature.title} 
              className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 p-4 transition-all duration-200 hover:shadow-md hover:border-slate-200"
            >
              <span className="text-xl">{feature.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-900">{feature.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200/50 px-4 py-3">
          <IconCheckCircle className="h-5 w-5 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-medium">Your data stays with you, always.</p>
        </div>
      </section>
    </div>
  );
}
