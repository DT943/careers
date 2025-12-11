"use client";

import { useState } from "react";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "./ProfileModalShell";

type Props = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
};

const EditLanguagesModal = ({ open, onClose, profile }: Props) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const [languages, setLanguages] = useState(
    profile.languages.map((l) => ({ name: l.name, level: l.level }))
  );

  if (!open) return null;

  const handleChange = (
    idx: number,
    field: "name" | "level",
    value: string
  ) => {
    setLanguages((prev) =>
      prev.map((item, i) =>
        i === idx
          ? { ...item, [field]: field === "level" ? Number(value) : value }
          : item
      )
    );
  };

  const addRow = () =>
    setLanguages((prev) => [...prev, { name: "", level: 0 }]);
  const removeRow = (idx: number) =>
    setLanguages((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async () => {
    const filtered = languages.filter((l) => l.name.trim());
    const fd = new FormData();
    filtered.forEach((lang, idx) => {
      fd.append(`languages[${idx}].name`, lang.name);
      fd.append(`languages[${idx}].level`, String(lang.level ?? 0));
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
        {languages.map((lang, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-3 items-center">
            <input
              value={lang.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
              placeholder="Language"
              className="col-span-7 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
            />
            <input
              type="number"
              min={0}
              max={4}
              value={lang.level}
              onChange={(e) => handleChange(idx, "level", e.target.value)}
              placeholder="Level (0-4)"
              className="col-span-3 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
            />
            <button
              onClick={() => removeRow(idx)}
              className="col-span-2 text-xs font-semibold text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addRow}
          className="text-xs font-semibold text-primary-1 hover:underline"
        >
          + Add language
        </button>
      </div>
    </ProfileModalShell>
  );
};

export default EditLanguagesModal;
