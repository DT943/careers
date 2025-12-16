"use client";

import { ClockIcon, MapPinIcon, SuitcaseIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useHasProfile } from "@/hooks";

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

  const handleApply = () => {
    if (!token) {
      router.push("/register");
      return;
    }

    // If user is logged in but has no profile yet, send them to profile page first
    if (!hasProfile && !hasProfileLoading) {
      router.push("/profile");
      return;
    }

    router.push(
      `/job-application?jobId=${id}&title=${encodeURIComponent(title)}`
    );
  };

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
    </div>
  );
};

export default VacancyCard;
