"use client";

import { useState } from "react";
import { ClockIcon, MapPinIcon, SuitcaseIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useHasProfile } from "@/hooks";
import ConfirmDialog from "@/components/ConfirmDialog";

interface VacancyCardProps {
  title: any;
  category: any;
  level: any;
  id: any;
  closingDate: any;
  type: any;
  posted: any;
  location: any;
}

type ConfirmMode = "login" | "profile" | null;

const VacancyCard: React.FC<VacancyCardProps> = ({
  title,
  category,
  level,
  id,
  closingDate,
  type,
  posted,
  location,
}) => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const { data: hasProfileData, isLoading: hasProfileLoading } = useHasProfile(
    !!token
  );
  const hasProfile = !!hasProfileData?.result;

  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);

  const handleApply = () => {
    if (!token) {
      setConfirmMode("login");
      return;
    }

    if (!hasProfile && !hasProfileLoading) {
      setConfirmMode("profile");
      return;
    }

    router.push(
      `/job-application?jobId=${id}&title=${encodeURIComponent(title)}`
    );
  };

  const handleConfirm = () => {
    if (confirmMode === "login") {
      router.push("/register");
    } else if (confirmMode === "profile") {
      router.push("/profile");
    }
    setConfirmMode(null);
  };

  const handleCancel = () => {
    setConfirmMode(null);
  };

  const showLoginConfirm = confirmMode === "login";
  const showProfileConfirm = confirmMode === "profile";

  return (
    <div className="bg-white p-6 rounded-lg w-full h-70">
      <h3 className="text-base font-bold text-primary-1">{title}</h3>

      <div className="flex justify-start items-center gap-2 mt-2">
        <p className="text-primary-1 text-sm font-normal bg-[#054E72]/10 rounded-xl px-2 py-1">
          {category}
        </p>
        <p className="text-primary-1 text-sm font-normal bg-[#E5E5E3]/70 rounded-xl px-2 py-1">
          {level}
        </p>
      </div>

      <p className="text-sm font-normal text-primary-900 pt-3">
        ID: {id} - Closing date: {closingDate}
      </p>
      <p className="text-sm font-normal text-primary-900 pt-1 flex justify-start items-center gap-1">
        <SuitcaseIcon size={18} /> {type}
      </p>
      <p className="text-sm font-normal text-primary-900 pt-1 flex justify-start items-center gap-1">
        <ClockIcon size={18} /> {posted}
      </p>
      <p className="text-sm font-normal text-primary-900 pt-1 flex justify-start items-center gap-1">
        <MapPinIcon size={18} />
        {location}
      </p>
      <button
        onClick={handleApply}
        disabled={!!token && hasProfileLoading}
        className="text-sm w-full mt-4 bg-primary-1 text-white py-2 px-4 rounded-lg p-1 hover:opacity-95 disabled:opacity-60"
      >
        {token && hasProfileLoading ? "Checking profile..." : "Apply Now"}
      </button>

      {/* Login confirmation */}
      <ConfirmDialog
        open={showLoginConfirm}
        title="Sign in required"
        message="You must sign in to apply for jobs. Click OK to go to the sign in page."
        confirmLabel="Sign in"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Profile creation confirmation */}
      <ConfirmDialog
        open={showProfileConfirm}
        title="Create your profile"
        message="You need to create your profile before applying. Click OK to go to your profile page."
        confirmLabel="Create profile"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default VacancyCard;
