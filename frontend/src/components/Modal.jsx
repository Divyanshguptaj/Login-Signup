import React from "react";

const Modal = ({ open, title, children, onClose, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border">
        {title && <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>}
        <div className="text-slate-600 mb-6">{children}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md border text-slate-700 hover:bg-slate-50">{cancelText}</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


