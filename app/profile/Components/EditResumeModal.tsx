"use client";

import { useState } from "react";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "./ProfileModalShell";

type Props = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
};

const EditResumeModal = ({ open, onClose, profile }: Props) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  const handleSave = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("resumeFile", file);
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
        disabled={isLoading || !file}
        className="rounded-md bg-[#054E72] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </>
  );

  return (
    <ProfileModalShell title="Update Resume" onClose={onClose} footer={footer} maxWidthClass="max-w-2xl">
      <div className="space-y-3 text-sm text-primary-900">
        <p>Current: {profile.resumeUrl ? "Resume on file" : "None"}</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
      </div>
    </ProfileModalShell>
  );
};

export default EditResumeModal;

