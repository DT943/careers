"use client";

import { useState, useEffect } from "react";
import { PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "../../../components/ProfileModalShell";

type EditSkillsModalProps = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
  mode?: "edit" | "add";
};

const EditSkillsModal = ({ open, onClose, profile, mode = "edit" }: EditSkillsModalProps) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const [skills, setSkills] = useState(
    mode === "add" ? [""] : profile.skills.length ? profile.skills.map((s) => s.name) : [""]
  );

  // Reset state when mode or open changes
  useEffect(() => {
    if (open) {
      if (mode === "add") {
        setSkills([""]);
      } else {
        setSkills(profile.skills.length ? profile.skills.map((s) => s.name) : [""]);
      }
    }
  }, [open, mode, profile.skills]);

  if (!open) return null;

  const handleChange = (idx: number, value: string) => {
    setSkills((prev) => prev.map((s, i) => (i === idx ? value : s)));
  };

  const addSkill = () => setSkills((prev) => [...prev, ""]);
  const removeSkill = (idx: number) =>
    setSkills((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    const cleanSkills = skills.map((s) => s.trim()).filter(Boolean);
    const fd = new FormData();
    
    if (mode === "add") {
      // Merge new skills with existing ones
      const existingSkills = profile.skills.map((s) => s.name);
      const allSkills = [...existingSkills, ...cleanSkills];
      allSkills.forEach((name, idx) => {
        fd.append(`skills[${idx}].name`, name);
      });
    } else {
      // Edit mode: replace all skills
      cleanSkills.forEach((name, idx) => {
        fd.append(`skills[${idx}].name`, name);
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
        onClick={handleSubmit}
        disabled={isLoading}
        className="rounded-md bg-[#054E72] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </>
  );

  return (
    <ProfileModalShell
      footer={footer}
      onClose={onClose}
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-3">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              value={skill}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder="Skill"
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
            />
            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(idx)}
                className="text-alert hover:text-red-600"
              >
                <TrashIcon size={18} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex items-center gap-2 text-sm text-primary-1 hover:opacity-80"
        >
          <PlusCircleIcon size={16} />
          Add skill
        </button>
      </div>
    </ProfileModalShell>
  );
};

export default EditSkillsModal;
