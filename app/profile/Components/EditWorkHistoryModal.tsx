"use client";

import { useState } from "react";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "../../../components/ProfileModalShell";
import { TrashIcon } from "@phosphor-icons/react";

type Props = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
};

const EditWorkHistoryModal = ({ open, onClose, profile }: Props) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const [rows, setRows] = useState(
    profile.experiences.map((exp) => ({
      title: exp.title,
      company: exp.company,
      startDate: exp.startDate?.split("T")[0] ?? "",
      endDate: exp.isCurrentRole ? "" : exp.endDate?.split("T")[0] ?? "",
      isCurrentRole: exp.isCurrentRole,
      city: exp.city,
      country: exp.country,
      responsibilities: exp.responsibilities ?? "",
    }))
  );

  if (!open) return null;

  const handleChange = (
    idx: number,
    field: keyof (typeof rows)[number],
    value: string | boolean
  ) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrentRole: false,
        city: "",
        country: "",
        responsibilities: "",
      },
    ]);

  const removeRow = (idx: number) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async () => {
    const filtered = rows.filter((r) => r.title.trim() || r.company.trim());
    const fd = new FormData();
    filtered.forEach((row, idx) => {
      fd.append(`experiences[${idx}].title`, row.title);
      fd.append(`experiences[${idx}].company`, row.company);
      fd.append(`experiences[${idx}].startDate`, row.startDate);
      fd.append(
        `experiences[${idx}].endDate`,
        row.isCurrentRole ? "" : row.endDate
      );
      fd.append(`experiences[${idx}].isCurrentRole`, String(row.isCurrentRole));
      fd.append(
        `experiences[${idx}].responsibilities`,
        row.responsibilities ?? ""
      );
      fd.append(`experiences[${idx}].city`, row.city ?? "");
      fd.append(`experiences[${idx}].country`, row.country ?? "");
    });
    await updateProfile(fd);
    onClose();
  };

  const footer = (
    <>
      <button
        onClick={onClose}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="rounded-md bg-[#054E72] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </>
  );

  return (
    <ProfileModalShell
      onClose={onClose}
      footer={footer}
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={idx} className="space-y-2">
            <div className="grid md:grid-cols-2 gap-3">
              <Field
                label="Title"
                value={row.title}
                onChange={(v) => handleChange(idx, "title", v)}
              />
              <Field
                label="Company"
                value={row.company}
                onChange={(v) => handleChange(idx, "company", v)}
              />
              <Field
                label="Start Date"
                type="date"
                value={row.startDate}
                onChange={(v) => handleChange(idx, "startDate", v)}
              />
              <Field
                label="End Date"
                type="date"
                value={row.endDate}
                onChange={(v) => handleChange(idx, "endDate", v)}
                disabled={row.isCurrentRole}
              />
              <Field
                label="City"
                value={row.city}
                onChange={(v) => handleChange(idx, "city", v)}
              />
              <Field
                label="Country"
                value={row.country}
                onChange={(v) => handleChange(idx, "country", v)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-primary-900">
              <input
                type="checkbox"
                checked={row.isCurrentRole}
                onChange={(e) =>
                  handleChange(idx, "isCurrentRole", e.target.checked)
                }
              />
              Currently working here
            </label>
            <label className="flex flex-col gap-1 text-sm text-primary-900">
              Responsibilities
              <textarea
                value={row.responsibilities}
                onChange={(e) =>
                  handleChange(idx, "responsibilities", e.target.value)
                }
                className="h-20 rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
              />
            </label>
            <button
              onClick={() => removeRow(idx)}
              className="m-2 text-xs font-semibold text-red-500 hover:underline"
            >
              <TrashIcon size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={addRow}
          className="text-xs font-semibold text-primary-1 hover:underline"
        >
          + Add work entry
        </button>
      </div>
    </ProfileModalShell>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-primary-900">
    {label}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1 disabled:bg-gray-100"
    />
  </label>
);

export default EditWorkHistoryModal;
