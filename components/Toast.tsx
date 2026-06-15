'use client';

import { CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export default function Toast({ message, type }: ToastProps) {
  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-in slide-in-from-bottom-4">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
          isSuccess
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}
      >
        {isSuccess ? (
          <CheckCircle size={20} />
        ) : (
          <AlertCircle size={20} />
        )}
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}
