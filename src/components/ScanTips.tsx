import { IconCheck, IconInfo } from '@/components/Icons';

const TIPS = [
  { text: 'Maintain a 4-module quiet zone around the code', icon: '📐' },
  { text: 'Use higher error correction (Q or H) for logos', icon: '🛡️' },
  { text: 'Test on multiple devices before printing', icon: '📱' },
  { text: 'Prefer dark foreground on light background', icon: '🎨' }
];

export default function ScanTips() {
  return (
    <section className="card px-6 py-6">
      <div className="section-header">
        <div className="section-icon bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <IconInfo className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Scan Tips</h2>
          <p className="text-sm text-slate-500">Ensure reliable scanning</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {TIPS.map((tip) => (
          <div 
            key={tip.text} 
            className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 p-3 transition-all duration-200 hover:shadow-md hover:border-slate-200"
          >
            <span className="text-lg">{tip.icon}</span>
            <span className="text-xs text-slate-700 font-medium leading-relaxed">{tip.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
