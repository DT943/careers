"use client";

import { useState, useRef } from "react";
import { useUpdateProfile } from "@/hooks";
import ProfileModalShell from "../../../components/ProfileModalShell";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddAttachmentModal = ({ open, onClose }: Props) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSave = async () => {
    if (files.length === 0) return;
    
    const fd = new FormData();
    // Send files as attachments[0].File, attachments[1].File, etc.
    files.forEach((file, idx) => {
      fd.append(`attachments[${idx}].File`, file);
    });
    
    try {
      await updateProfile(fd);
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    } catch (error) {
      console.error("Error adding attachments:", error);
    }
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
        disabled={isLoading || files.length === 0}
        className="rounded-md bg-[#054E72] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Add"}
      </button>
    </>
  );

  return (
    <ProfileModalShell
      title="Add Attachments"
      onClose={onClose}
      footer={footer}
      maxWidthClass="max-w-2xl"
    >
      <div className="space-y-3 text-sm text-primary-900">
        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">
            Select files to upload
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleFileChange}
            className="text-sm w-full"
          />
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Selected files:</p>
            <ul className="list-disc list-inside space-y-1">
              {files.map((file, idx) => (
                <li key={idx} className="text-xs text-gray-600">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProfileModalShell>
  );
};

export default AddAttachmentModal;

