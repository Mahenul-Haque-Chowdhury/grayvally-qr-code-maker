import { useCallback, useState } from 'react';

type Toast = {
  id: string;
  message: string;
};

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((message: string) => {
    const toast = { id: crypto.randomUUID(), message };
    setToasts((prev) => [...prev, toast]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== toast.id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { toasts, pushToast, dismissToast };
}
