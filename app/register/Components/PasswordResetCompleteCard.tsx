"use client";

import { CheckCircle } from "@phosphor-icons/react";
import Image from "next/image";
import successIcon from "../../../public/images/success.png";
type PasswordResetCompleteCardProps = {
  onReturnToSignIn: () => void;
};

const PasswordResetCompleteCard: React.FC<PasswordResetCompleteCardProps> = ({
  onReturnToSignIn,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Success Icon */}

      <div className="flex items-center justify-center py-10">
        <Image src={successIcon} alt="Success Icon" width={100} height={100} />
      </div>

      {/* Message */}
      <div className="flex items-center justify-center text-center space-y-2 py-4">
        <p className="text-sm text-gray-600">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={onReturnToSignIn}
        className="w-full rounded-md bg-[#054E72] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition"
      >
        Return to sign In
      </button>
    </div>
  );
};

export default PasswordResetCompleteCard;
