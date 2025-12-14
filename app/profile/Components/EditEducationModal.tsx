"use client";

import { useState, useEffect } from "react";
import { PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "../../../components/ProfileModalShell";

type Props = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
  mode?: "edit" | "add";
};

const EMPTY_EDUCATION_ROW = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
};

const EditEducationModal = ({
  open,
  onClose,
  profile,
  mode = "edit",
}: Props) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();

  const [rows, setRows] = useState(
    mode === "add"
      ? [EMPTY_EDUCATION_ROW]
      : profile.educations.length
      ? profile.educations.map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: edu.startDate?.split("T")[0] ?? "",
          endDate: edu.endDate?.split("T")[0] ?? "",
          grade: edu.grade ?? "",
        }))
      : [EMPTY_EDUCATION_ROW]
  );

  // Reset state when mode or open changes
  useEffect(() => {
    if (open) {
      if (mode === "add") {
        setRows([EMPTY_EDUCATION_ROW]);
      } else {
        setRows(
          profile.educations.length
            ? profile.educations.map((edu) => ({
                institution: edu.institution,
                degree: edu.degree,
                fieldOfStudy: edu.fieldOfStudy,
                startDate: edu.startDate?.split("T")[0] ?? "",
                endDate: edu.endDate?.split("T")[0] ?? "",
                grade: edu.grade ?? "",
              }))
            : [EMPTY_EDUCATION_ROW]
        );
      }
    }
  }, [open, mode, profile.educations]);

  if (!open) return null;

  const handleChange = (
    idx: number,
    field: keyof (typeof rows)[number],
    value: string
  ) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
      },
    ]);

  const removeRow = (idx: number) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async () => {
    const filtered = rows.filter(
      (r) => r.degree.trim() || r.institution.trim()
    );
    const fd = new FormData();

    if (mode === "add") {
      // Merge new educations with existing ones
      const existingEducations = profile.educations.map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate?.split("T")[0] ?? "",
        endDate: edu.endDate?.split("T")[0] ?? "",
        grade: edu.grade ?? "",
      }));
      const allEducations = [...existingEducations, ...filtered];
      allEducations.forEach((row, idx) => {
        fd.append(`educations[${idx}].institution`, row.institution);
        fd.append(`educations[${idx}].degree`, row.degree);
        fd.append(`educations[${idx}].fieldOfStudy`, row.fieldOfStudy);
        fd.append(`educations[${idx}].startDate`, row.startDate);
        fd.append(`educations[${idx}].endDate`, row.endDate);
        fd.append(`educations[${idx}].grade`, row.grade ?? "");
      });
    } else {
      // Edit mode: replace all educations
      filtered.forEach((row, idx) => {
        fd.append(`educations[${idx}].institution`, row.institution);
        fd.append(`educations[${idx}].degree`, row.degree);
        fd.append(`educations[${idx}].fieldOfStudy`, row.fieldOfStudy);
        fd.append(`educations[${idx}].startDate`, row.startDate);
        fd.append(`educations[${idx}].endDate`, row.endDate);
        fd.append(`educations[${idx}].grade`, row.grade ?? "");
      });
    }

    await updateProfile(fd);
    onClose();
  };

  return (
    <ProfileModalShell
      onClose={onClose}
      footer={
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
      }
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div className="border border-gray-200 rounded-lg p-3" key={idx}>
            <div className="grid md:grid-cols-2 gap-3">
              <Field
                label="Institution"
                value={row.institution}
                onChange={(v) => handleChange(idx, "institution", v)}
              />
              <Field
                label="Degree"
                value={row.degree}
                onChange={(v) => handleChange(idx, "degree", v)}
              />
              <Field
                label="Field of Study"
                value={row.fieldOfStudy}
                onChange={(v) => handleChange(idx, "fieldOfStudy", v)}
              />
              <Field
                label="Grade"
                value={row.grade}
                onChange={(v) => handleChange(idx, "grade", v)}
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
              />
            </div>
            <div className="flex justify-end items-end mt-1">
              <button
                onClick={() => removeRow(idx)}
                className=" text-xs font-semibold mt-2 text-alert hover:underline"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addRow}
          className="mt-3 rounded-lg border border-[#E5E5E3] py-2 px-4 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
        >
          <PlusCircleIcon size={24} className="mr-2" />
          Add education
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-primary-900">
    {label}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
    />
  </label>
);

export default EditEducationModal;
