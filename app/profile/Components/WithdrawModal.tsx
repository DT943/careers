import { useState } from "react";
import { WarningIcon, XIcon } from "@phosphor-icons/react";

interface WithdrawModalProps {
  isOpen?: boolean;
  onCancel?: () => void;
  onWithdraw?: (note: string) => void;
  loading?: boolean;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onCancel,
  onWithdraw,
  loading,
}) => {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleWithdrawClick = () => {
    if (onWithdraw) {
      onWithdraw(note.trim());
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-center gap-2">
            <WarningIcon size={20} className="text-alert" />
            <h2 id="modalTitle" className="text-xl font-bold text-primary-900">
              Withdraw this application?
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

        <div className="mt-4 space-y-4">
          <p className="text-sm leading-6 text-[#5F5F5C] text-center">
            Are you sure you want to withdraw? You will be removed from the
            hiring process for this job.
          </p>

          <div className="text-left">
            <label className="block text-sm font-medium text-primary-900 mb-1">
              Reason
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
              placeholder="Let us know why you’re withdrawing your application..."
            />
          </div>
        </div>

        <footer className="mt-6 flex w-full gap-2">
          <button
            onClick={onCancel}
            type="button"
            className="text-sm font-semibold w-1/2 border border-[#054E72] text-primary-1 py-3 px-4 rounded-lg p-1 hover:bg-[#F5F5F4] disabled:opacity-60"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleWithdrawClick}
            type="button"
            disabled={loading}
            className="inline-flex w-1/2 items-center justify-center rounded-md bg-primary-1 px-5 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Withdrawing..." : "Yes, withdraw"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default WithdrawModal;
