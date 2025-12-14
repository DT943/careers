"use client";

import { useState, useEffect } from "react";
import { useCreateJobAlert, usePositionTitles, useTeams } from "@/hooks";
import ProfileModalShell from "../../../components/ProfileModalShell";
import {
  JobLevel,
  EmploymentType,
  WorkArrangementType,
} from "@/enums";
import {
  getLevelLabel,
  getEmploymentTypeLabel,
  getWorkArrangementLabel,
} from "@/utils";

type NewJobAlertModalProps = {
  open: boolean;
  onClose: () => void;
};

const NewJobAlertModal = ({ open, onClose }: NewJobAlertModalProps) => {
  const { mutateAsync: createAlert, isLoading } = useCreateJobAlert();
  const { data: positionTitlesData } = usePositionTitles(
    { languageCode: "en" },
    open
  );
  const { data: teamsData } = useTeams({ languageCode: "en" }, open);

  const [form, setForm] = useState({
    jobLevel: JobLevel.Intern,
    employmentType: EmploymentType.FullTime,
    workArrangementType: WorkArrangementType.Onsite,
    positionTitleId: 0,
    jobCategory: 0,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setForm({
        jobLevel: JobLevel.Intern,
        employmentType: EmploymentType.FullTime,
        workArrangementType: WorkArrangementType.Onsite,
        positionTitleId: 0,
        jobCategory: 0,
      });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.positionTitleId || !form.jobCategory) {
      alert("Please select Position Title and Job Category");
      return;
    }

    await createAlert({
      jobLevel: form.jobLevel,
      employmentType: form.employmentType,
      workArrangementType: form.workArrangementType,
      positionTitleId: form.positionTitleId,
      jobCategory: form.jobCategory,
    });
    onClose();
  };

  const positionTitles = positionTitlesData?.result?.items ?? [];
  const teams = teamsData?.result?.items ?? [];

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
        onClick={handleSubmit}
        disabled={isLoading}
        className="rounded-md bg-[#054E72] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
      >
        {isLoading ? "Creating..." : "Create Alert"}
      </button>
    </>
  );

  return (
    <ProfileModalShell
      title="Create New Job Alert"
      footer={footer}
      onClose={onClose}
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-4">
        {/* Job Level */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-primary-900">
            Job Level *
          </label>
          <select
            value={form.jobLevel}
            onChange={(e) => handleChange("jobLevel", Number(e.target.value))}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
          >
            {Object.values(JobLevel)
              .filter((v) => typeof v === "number")
              .map((level) => (
                <option key={level} value={level}>
                  {getLevelLabel(level as JobLevel)}
                </option>
              ))}
          </select>
        </div>

        {/* Employment Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-primary-900">
            Employment Type *
          </label>
          <select
            value={form.employmentType}
            onChange={(e) =>
              handleChange("employmentType", Number(e.target.value))
            }
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
          >
            {Object.values(EmploymentType)
              .filter((v) => typeof v === "number")
              .map((type) => (
                <option key={type} value={type}>
                  {getEmploymentTypeLabel(type as EmploymentType)}
                </option>
              ))}
          </select>
        </div>

        {/* Work Arrangement Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-primary-900">
            Work Arrangement *
          </label>
          <select
            value={form.workArrangementType}
            onChange={(e) =>
              handleChange("workArrangementType", Number(e.target.value))
            }
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
          >
            {Object.values(WorkArrangementType)
              .filter((v) => typeof v === "number")
              .map((arrangement) => (
                <option key={arrangement} value={arrangement}>
                  {getWorkArrangementLabel(arrangement as WorkArrangementType)}
                </option>
              ))}
          </select>
        </div>

        {/* Position Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-primary-900">
            Position Title *
          </label>
          <select
            value={form.positionTitleId}
            onChange={(e) =>
              handleChange("positionTitleId", Number(e.target.value))
            }
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
          >
            <option value={0}>Select Position Title</option>
            {positionTitles.map((title) => {
              const translation =
                title.positionTitleTranslations.find((t) => t.languageCode === "en") ||
                title.positionTitleTranslations[0];
              return (
                <option key={title.id} value={title.id}>
                  {translation?.title || `Title ${title.id}`}
                </option>
              );
            })}
          </select>
        </div>

        {/* Job Category (Team) */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-primary-900">
            Job Category (Team) *
          </label>
          <select
            value={form.jobCategory}
            onChange={(e) => handleChange("jobCategory", Number(e.target.value))}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
          >
            <option value={0}>Select Team</option>
            {teams.map((team) => {
              const translation =
                team.teamTranslations.find((t) => t.languageCode === "en") ||
                team.teamTranslations[0];
              return (
                <option key={team.id} value={team.id}>
                  {translation?.name || `Team ${team.id}`}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </ProfileModalShell>
  );
};

export default NewJobAlertModal;

