import type { HistoryItem } from '@/types/qr';
import { formatTimestamp, truncate } from '@/lib/utils';
import { IconArrowRight, IconHistory, IconStar, IconStarFilled } from '@/components/Icons';

type Props = {
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onToggleStar: (id: string) => void;
};

const TYPE_COLORS: Record<string, string> = {
  text: 'from-blue-500 to-blue-600',
  wifi: 'from-emerald-500 to-teal-600',
  email: 'from-amber-500 to-orange-600',
  phone: 'from-purple-500 to-violet-600',
  sms: 'from-pink-500 to-rose-600',
  vcard: 'from-slate-600 to-slate-800'
};

export default function HistoryPanel({ history, onRestore, onToggleStar }: Props) {
  return (
    <section className="card px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            <IconHistory className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">History</h2>
            <p className="text-sm text-slate-500">Recent QR codes</p>
          </div>
        </div>
        {history.length > 0 && (
          <span className="badge">{history.length} items</span>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <IconHistory className="h-7 w-7" />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">No history yet</p>
            <p className="mt-1 text-xs text-slate-500">Generate a QR code to get started</p>
          </div>
        )}

        {history.map((item, index) => (
          <div
            key={item.id}
            className="group flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white p-3 transition-all duration-200 hover:border-slate-300 hover:shadow-md animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Type indicator */}
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${TYPE_COLORS[item.type] || TYPE_COLORS.text} text-white text-xs font-bold uppercase shadow-sm`}>
              {item.type.slice(0, 2)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 uppercase">{item.type}</span>
                <span className="text-[10px] text-slate-400">•</span>
                <span className="text-[10px] text-slate-500">{formatTimestamp(item.timestamp)}</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600 truncate">{truncate(item.payload, 50)}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                className={`btn-icon flex items-center justify-center h-8 w-8 rounded-lg transition-colors ${item.starred ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-slate-400 hover:text-amber-500'}`}
                onClick={() => onToggleStar(item.id)}
                aria-label={item.starred ? 'Remove from favorites' : 'Add to favorites'}
              >
                {item.starred ? <IconStarFilled className="h-4 w-4" /> : <IconStar className="h-4 w-4" />}
              </button>
              <button
                type="button"
                className="btn-icon flex items-center justify-center h-8 w-8 rounded-lg text-brand-600 hover:bg-brand-50 hover:border-brand-200"
                onClick={() => onRestore(item)}
                aria-label="Restore this QR code"
              >
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
