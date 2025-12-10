import { TrashIcon } from "@phosphor-icons/react";
import React from "react";

type JobAlert = {
  id: number;
  title: string;
  keywords: string;
  workingTime: string;
  jobLevel: string;
  location: string;
  jobCategory: string;
  alertFrequency: string;
  isActive: boolean;
};

type JobAlertCardProps = {
  alert: JobAlert;
  onToggle?: () => void;
  onDelete?: () => void;
};

const JobAlertCard: React.FC<JobAlertCardProps> = ({
  alert,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="w-sm lg:w-2xl flex items-start justify-between gap-8 rounded-2xl border border-[#E5E5E3] px-6 py-8 shadow-sm">
      {/* Left side: title + details */}
      <div className="flex-1">
        <div className="mb-3 flex items-center gap-3">
          <h3 className="text-base font-semibold text-slate-900">
            {alert.title}
          </h3>

          {/* Status pill */}
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {alert.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Two-column details */}
        <div className="grid gap-y-1 text-sm text-slate-800 sm:grid-cols-2">
          <p>
            <span className="font-semibold">Keywords:</span> {alert.keywords}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {alert.location}
          </p>
          <p>
            <span className="font-semibold">Working Time:</span>{" "}
            {alert.workingTime}
          </p>
          <p>
            <span className="font-semibold">Job Category:</span>{" "}
            {alert.jobCategory}
          </p>
          <p>
            <span className="font-semibold">Job Level:</span> {alert.jobLevel}
          </p>
          <p>
            <span className="font-semibold">Alert Frequency:</span>{" "}
            {alert.alertFrequency}
          </p>
        </div>
      </div>

      {/* Right side: toggle + delete */}
      <div className="flex items-start gap-2 pl-8">
        {/* Toggle switch */}
        <button
          type="button"
          onClick={onToggle}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            alert.isActive ? "bg-[#00527a]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              alert.isActive ? "translate-x-4" : "translate-x-1"
            }`}
          />
        </button>

        {/* Delete icon */}
        <button type="button" onClick={onDelete} className="text-alert">
          <TrashIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default JobAlertCard;
