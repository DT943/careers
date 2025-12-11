"use client";

import { useState } from "react";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "./ProfileModalShell";

type EditPersonalInfoModalProps = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
};

const EditPersonalInfoModal = ({
  open,
  onClose,
  profile,
}: EditPersonalInfoModalProps) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const [form, setForm] = useState({
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    country: profile.country ?? "",
    city: profile.city ?? "",
    countryPhoneCode: "",
    phoneNumber: profile.phoneNumber ?? "",
    dateOfBirth: profile.dateOfBirth?.split("T")[0] ?? "",
    nationality: profile.nationality ?? "",
    linkedInUrl: profile.linkedInUrl ?? "",
    portfolioUrl: profile.portfolioUrl ?? "",
  });

  if (!open) return null;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== undefined && val !== null && String(val).length > 0) {
        fd.append(key, val as string);
      }
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
      onClose={onClose}
      footer={footer}
      maxWidthClass="max-w-4xl"
    >
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <Field
          label="First Name *"
          value={form.firstName}
          onChange={(v) => handleChange("firstName", v)}
        />
        <Field
          label="Last Name *"
          value={form.lastName}
          onChange={(v) => handleChange("lastName", v)}
        />
        <Field label="Country *" value={form.country} onChange={(v) => handleChange("country", v)} />
        <Field label="City *" value={form.city} onChange={(v) => handleChange("city", v)} />
        <Field
          label="Country Phone Code *"
          value={form.countryPhoneCode}
          onChange={(v) => handleChange("countryPhoneCode", v)}
          placeholder="e.g. +963"
        />
        <Field
          label="Phone Number *"
          value={form.phoneNumber}
          onChange={(v) => handleChange("phoneNumber", v)}
        />
        <Field
          label="Date of Birth *"
          type="date"
          value={form.dateOfBirth}
          onChange={(v) => handleChange("dateOfBirth", v)}
        />
        <Field
          label="Nationality *"
          value={form.nationality}
          onChange={(v) => handleChange("nationality", v)}
        />
        <Field
          label="LinkedIn Profile (Optional)"
          value={form.linkedInUrl}
          onChange={(v) => handleChange("linkedInUrl", v)}
        />
        <Field
          label="Portfolio/Website (Optional)"
          value={form.portfolioUrl}
          onChange={(v) => handleChange("portfolioUrl", v)}
        />
      </div>
    </ProfileModalShell>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-primary-900">
    {label}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
    />
  </label>
);

export default EditPersonalInfoModal;
