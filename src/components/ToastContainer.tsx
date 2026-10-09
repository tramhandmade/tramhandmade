import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#6F3038] text-[#FFFDF9] py-3 px-4 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-auto border border-[#8B4A4F]"
        >
          <CheckCircle size={18} className="text-[#E9D5D0] shrink-0" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
