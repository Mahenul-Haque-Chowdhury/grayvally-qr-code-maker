import { IconCheckCircle } from '@/components/Icons';

type Toast = {
  id: string;
  message: string;
};

type Props = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

export default function Toasts({ toasts, onDismiss }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur-lg px-4 py-3 text-sm text-slate-700 shadow-xl animate-slide-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <IconCheckCircle className="h-4 w-4" />
          </div>
          <span className="font-medium">{toast.message}</span>
          <button
            type="button"
            className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
