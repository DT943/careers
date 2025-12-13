"use client";

import ProfileModalShell from "../../../components/ProfileModalShell";

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
};

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  if (!open) return null;

  const footer = (
    <>
      <button
        onClick={onClose}
        disabled={isLoading}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-gray-50 disabled:opacity-60"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading}
        className="rounded-md bg-[#B00300] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </>
  );

  return (
    <ProfileModalShell
      onClose={onClose}
      footer={footer}
      maxWidthClass="max-w-md"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </ProfileModalShell>
  );
};

export default DeleteConfirmationModal;

