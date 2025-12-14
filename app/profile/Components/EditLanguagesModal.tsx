"use client";

import { useState, useEffect } from "react";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "../../../components/ProfileModalShell";
import { LanguageLevel } from "@/enums";
import { getLanguageLevelLabel } from "@/utils";
import { TrashIcon } from "@phosphor-icons/react";

type Props = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
  mode?: "edit" | "add";
};

const EditLanguagesModal = ({ open, onClose, profile, mode = "edit" }: Props) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const [languages, setLanguages] = useState(
    mode === "add" 
      ? [{ name: "", level: LanguageLevel.Beginner }]
      : profile.languages.length 
        ? profile.languages.map((l) => ({ name: l.name, level: l.level }))
        : [{ name: "", level: LanguageLevel.Beginner }]
  );

  // Reset state when mode or open changes
  useEffect(() => {
    if (open) {
      if (mode === "add") {
        setLanguages([{ name: "", level: LanguageLevel.Beginner }]);
      } else {
        setLanguages(
          profile.languages.length 
            ? profile.languages.map((l) => ({ name: l.name, level: l.level }))
            : [{ name: "", level: LanguageLevel.Beginner }]
        );
      }
    }
  }, [open, mode, profile.languages]);

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
    setLanguages((prev) => [...prev, { name: "", level: LanguageLevel.Beginner }]);
  const removeRow = (idx: number) =>
    setLanguages((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async () => {
    const filtered = languages.filter((l) => l.name.trim());
    const fd = new FormData();
    
    if (mode === "add") {
      // Merge new languages with existing ones
      const existingLanguages = profile.languages.map((l) => ({ name: l.name, level: l.level }));
      const allLanguages = [...existingLanguages, ...filtered];
      allLanguages.forEach((lang, idx) => {
        fd.append(`languages[${idx}].name`, lang.name);
        fd.append(`languages[${idx}].level`, String(lang.level ?? LanguageLevel.Beginner));
      });
    } else {
      // Edit mode: replace all languages
      filtered.forEach((lang, idx) => {
        fd.append(`languages[${idx}].name`, lang.name);
        fd.append(`languages[${idx}].level`, String(lang.level ?? LanguageLevel.Beginner));
      });
    }
    
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
              className="col-span-8 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
            />
            <select
              value={lang.level}
              onChange={(e) => handleChange(idx, "level", e.target.value)}
              className="col-span-3 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
            >
              <option value={LanguageLevel.Beginner}>
                {getLanguageLevelLabel(LanguageLevel.Beginner)}
              </option>
              <option value={LanguageLevel.Intermediate}>
                {getLanguageLevelLabel(LanguageLevel.Intermediate)}
              </option>
              <option value={LanguageLevel.Fluent}>
                {getLanguageLevelLabel(LanguageLevel.Fluent)}
              </option>
              <option value={LanguageLevel.Native}>
                {getLanguageLevelLabel(LanguageLevel.Native)}
              </option>
            </select>
            <button
              onClick={() => removeRow(idx)}
              className="text-xs font-semibold text-alert hover:underline"
            >
              <TrashIcon size={20} />
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
