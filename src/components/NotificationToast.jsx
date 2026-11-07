import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#102820] text-white rounded-xl shadow-2xl border border-[#176B50]/40 max-w-md"
      >
        <div className="w-8 h-8 rounded-lg bg-[#176B50] flex items-center justify-center shrink-0 text-[#B9F27C]">
          {toast.type === 'info' ? <Info className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
        </div>
        <div className="flex-1 text-sm">
          <p className="font-semibold text-white">{toast.title}</p>
          <p className="text-emerald-200/80 text-xs mt-0.5">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

