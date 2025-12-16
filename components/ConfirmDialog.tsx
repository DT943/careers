"use client";

import { XIcon } from "@phosphor-icons/react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white shadow-xl">
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center gap-2">
              <h2
                id="modalTitle"
                className="text-xl font-semibold text-primary-900"
              >
                {title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <XIcon size={20} className="text-[#282826]" />
            </button>
          </div>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex justify-center gap-3 px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-[#054E72] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
