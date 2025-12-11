"use client";

type ProfileModalShellProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string;
  showCloseButton?: boolean;
};

const ProfileModalShell = ({
  children,
  footer,
  maxWidthClass = "max-w-4xl",
}: ProfileModalShellProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className={`w-full ${maxWidthClass} rounded-lg bg-white shadow-xl`}>
        <div className="px-6 py-6">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileModalShell;
