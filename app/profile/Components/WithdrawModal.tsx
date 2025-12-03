import { WarningIcon, XIcon } from "@phosphor-icons/react";

interface WithdrawModalProps {
  isOpen?: boolean;
  onCancel?: any;
  onWithdraw?: any;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onCancel,
  onWithdraw,
}) => {
  return (
    <div>
      {isOpen && (
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
                <h2
                  id="modalTitle"
                  className="text-xl font-bold text-primary-900"
                >
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

            <div className="mt-4 p-1 flex justify-center text-center">
              <p className="text-sm leading-6 text-[#5F5F5C]">
                Are you sure you want to withdraw? You will be removed from the
                hiring process for this job.
              </p>
            </div>

            <footer className="mt-6 flex w-full gap-2">
              <button
                onClick={onCancel}
                className="text-sm font-semibold w-1/2 border border-[#054E72] text-primary-1 py-3 px-4 rounded-lg p-1 hover:bg-[#F5F5F4]"
              >
                Cancel
              </button>

              <button
                onClick={onWithdraw}
                type="button"
                className="inline-flex w-1/2 items-center justify-center rounded-md bg-primary-1 px-5 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                Yes, withdraw
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawModal;
