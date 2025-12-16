"use client";

import { useState } from "react";
import { useCreateProfile } from "@/hooks";
import { LanguageLevel } from "@/enums";
import { getLanguageLevelLabel } from "@/utils";
import { PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { useAuthStore } from "@/store/useAuthStore";

const CreateProfileForm = () => {
  const { mutateAsync: createProfile, isLoading } = useCreateProfile();
  const { email } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    countryPhoneCode: "",
    phoneNumber: "",
    dateOfBirth: "",
    nationality: "",
    linkedInUrl: "",
    portfolioUrl: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([""]);
  const [workHistory, setWorkHistory] = useState([
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
  const [educationHistory, setEducationHistory] = useState([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
    },
  ]);
  const [languages, setLanguages] = useState([
    { name: "", level: LanguageLevel.Beginner },
  ]);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (idx: number, value: string) => {
    setSkills((prev) => prev.map((s, i) => (i === idx ? value : s)));
  };

  const addSkill = () => setSkills((prev) => [...prev, ""]);
  const removeSkill = (idx: number) =>
    setSkills((prev) => prev.filter((_, i) => i !== idx));

  const handleWorkChange = (
    idx: number,
    field: string,
    value: string | boolean
  ) => {
    setWorkHistory((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    );
  };

  const addWork = () =>
    setWorkHistory((prev) => [
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

  const removeWork = (idx: number) =>
    setWorkHistory((prev) => prev.filter((_, i) => i !== idx));

  const handleEducationChange = (idx: number, field: string, value: string) => {
    setEducationHistory((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const addEducation = () =>
    setEducationHistory((prev) => [
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

  const removeEducation = (idx: number) =>
    setEducationHistory((prev) => prev.filter((_, i) => i !== idx));

  const handleLanguageChange = (
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

  const addLanguage = () =>
    setLanguages((prev) => [...prev, { name: "", level: LanguageLevel.Beginner }]);

  const removeLanguage = (idx: number) =>
    setLanguages((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    const fd = new FormData();

    // Personal information
    Object.entries(form).forEach(([key, val]) => {
      if (val && String(val).length > 0) {
        fd.append(key, val as string);
      }
    });

    // Add email from store if available
    if (email) {
      fd.append("email", email);
    }

    // Resume
    if (resumeFile) {
      fd.append("resumeFile", resumeFile);
    }

    // Skills
    const cleanSkills = skills.map((s) => s.trim()).filter(Boolean);
    cleanSkills.forEach((name, idx) => {
      fd.append(`skills[${idx}].name`, name);
    });

    // Work history
    const cleanWork = workHistory.filter(
      (w) => w.title.trim() || w.company.trim()
    );
    cleanWork.forEach((work, idx) => {
      fd.append(`experiences[${idx}].title`, work.title);
      fd.append(`experiences[${idx}].company`, work.company);
      fd.append(`experiences[${idx}].startDate`, work.startDate);
      if (work.endDate) {
        fd.append(`experiences[${idx}].endDate`, work.endDate);
      }
      fd.append(`experiences[${idx}].isCurrentRole`, String(work.isCurrentRole));
      fd.append(`experiences[${idx}].city`, work.city);
      fd.append(`experiences[${idx}].country`, work.country);
      if (work.responsibilities) {
        fd.append(`experiences[${idx}].responsibilities`, work.responsibilities);
      }
    });

    // Education
    const cleanEducation = educationHistory.filter(
      (e) => e.degree.trim() || e.institution.trim()
    );
    cleanEducation.forEach((edu, idx) => {
      fd.append(`educations[${idx}].institution`, edu.institution);
      fd.append(`educations[${idx}].degree`, edu.degree);
      fd.append(`educations[${idx}].fieldOfStudy`, edu.fieldOfStudy);
      fd.append(`educations[${idx}].startDate`, edu.startDate);
      if (edu.endDate) {
        fd.append(`educations[${idx}].endDate`, edu.endDate);
      }
      if (edu.grade) {
        fd.append(`educations[${idx}].grade`, edu.grade);
      }
    });

    // Languages
    const cleanLanguages = languages.filter((l) => l.name.trim());
    cleanLanguages.forEach((lang, idx) => {
      fd.append(`languages[${idx}].name`, lang.name);
      fd.append(`languages[${idx}].level`, String(lang.level ?? LanguageLevel.Beginner));
    });

    try {
      await createProfile(fd);
      // The query will automatically refetch after mutation success
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg py-8 px-12">
        <div className="text-left justify-center mb-8">
          <h1 className="text-2xl font-semibold text-primary-900 mb-2">
            Create Your Profile
          </h1>
          <p className="text-sm text-gray-600">
            Please fill in your information to create your profile.
          </p>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <section>
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="First Name *"
                value={form.firstName}
                onChange={(v) => handleFormChange("firstName", v)}
              />
              <Field
                label="Last Name *"
                value={form.lastName}
                onChange={(v) => handleFormChange("lastName", v)}
              />
              <Field
                label="Email *"
                type="email"
                value={email || ""}
                onChange={() => {}}
                disabled={true}
              />
              <Field
                label="Country *"
                value={form.country}
                onChange={(v) => handleFormChange("country", v)}
              />
              <Field
                label="City *"
                value={form.city}
                onChange={(v) => handleFormChange("city", v)}
              />
              <Field
                label="Country Phone Code *"
                value={form.countryPhoneCode}
                onChange={(v) => handleFormChange("countryPhoneCode", v)}
                placeholder="e.g. +963"
              />
              <Field
                label="Phone Number *"
                value={form.phoneNumber}
                onChange={(v) => handleFormChange("phoneNumber", v)}
              />
              <Field
                label="Date of Birth *"
                type="date"
                value={form.dateOfBirth}
                onChange={(v) => handleFormChange("dateOfBirth", v)}
              />
              <Field
                label="Nationality *"
                value={form.nationality}
                onChange={(v) => handleFormChange("nationality", v)}
              />
              <Field
                label="LinkedIn Profile (Optional)"
                value={form.linkedInUrl}
                onChange={(v) => handleFormChange("linkedInUrl", v)}
              />
              <Field
                label="Portfolio/Website (Optional)"
                value={form.portfolioUrl}
                onChange={(v) => handleFormChange("portfolioUrl", v)}
              />
            </div>
          </section>

          {/* Resume */}
          <section>
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Resume
            </h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-900">
                Upload Resume *
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                className="text-sm"
              />
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    value={skill}
                    onChange={(e) => handleSkillChange(idx, e.target.value)}
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
                className="rounded-lg border border-[#E5E5E3] py-2 px-4 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
              >
                <PlusCircleIcon size={24} className="mr-2" />
                Add skill
              </button>
            </div>
          </section>

          {/* Work History */}
          <section>
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Work History
            </h2>
            <div className="space-y-4">
              {workHistory.map((work, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field
                      label="Job Title"
                      value={work.title}
                      onChange={(v) => handleWorkChange(idx, "title", v)}
                    />
                    <Field
                      label="Company"
                      value={work.company}
                      onChange={(v) => handleWorkChange(idx, "company", v)}
                    />
                    <Field
                      label="Start Date"
                      type="date"
                      value={work.startDate}
                      onChange={(v) => handleWorkChange(idx, "startDate", v)}
                    />
                    {!work.isCurrentRole && (
                      <Field
                        label="End Date"
                        type="date"
                        value={work.endDate}
                        onChange={(v) => handleWorkChange(idx, "endDate", v)}
                      />
                    )}
                    <Field
                      label="City"
                      value={work.city}
                      onChange={(v) => handleWorkChange(idx, "city", v)}
                    />
                    <Field
                      label="Country"
                      value={work.country}
                      onChange={(v) => handleWorkChange(idx, "country", v)}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={work.isCurrentRole}
                        onChange={(e) =>
                          handleWorkChange(idx, "isCurrentRole", e.target.checked)
                        }
                      />
                      <span className="text-sm text-primary-900">
                        Currently working here
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-1">
                      Responsibilities
                    </label>
                    <textarea
                      value={work.responsibilities}
                      onChange={(e) =>
                        handleWorkChange(idx, "responsibilities", e.target.value)
                      }
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
                      rows={3}
                    />
                  </div>
                  {workHistory.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWork(idx)}
                      className="text-xs font-semibold text-alert hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addWork}
                className="rounded-lg border border-[#E5E5E3] py-2 px-4 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
              >
                <PlusCircleIcon size={24} className="mr-2" />
                Add work history
              </button>
            </div>
          </section>

          {/* Education History */}
          <section>
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Education History
            </h2>
            <div className="space-y-4">
              {educationHistory.map((edu, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field
                      label="Institution"
                      value={edu.institution}
                      onChange={(v) => handleEducationChange(idx, "institution", v)}
                    />
                    <Field
                      label="Degree"
                      value={edu.degree}
                      onChange={(v) => handleEducationChange(idx, "degree", v)}
                    />
                    <Field
                      label="Field of Study"
                      value={edu.fieldOfStudy}
                      onChange={(v) => handleEducationChange(idx, "fieldOfStudy", v)}
                    />
                    <Field
                      label="Start Date"
                      type="date"
                      value={edu.startDate}
                      onChange={(v) => handleEducationChange(idx, "startDate", v)}
                    />
                    <Field
                      label="End Date"
                      type="date"
                      value={edu.endDate}
                      onChange={(v) => handleEducationChange(idx, "endDate", v)}
                    />
                    <Field
                      label="Grade (Optional)"
                      value={edu.grade}
                      onChange={(v) => handleEducationChange(idx, "grade", v)}
                    />
                  </div>
                  {educationHistory.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="text-xs font-semibold text-alert hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className="rounded-lg border border-[#E5E5E3] py-2 px-4 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
              >
                <PlusCircleIcon size={24} className="mr-2" />
                Add education
              </button>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Languages
            </h2>
            <div className="space-y-3">
              {languages.map((lang, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                  <input
                    value={lang.name}
                    onChange={(e) => handleLanguageChange(idx, "name", e.target.value)}
                    placeholder="Language"
                    className="col-span-8 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
                  />
                  <select
                    value={lang.level}
                    onChange={(e) => handleLanguageChange(idx, "level", e.target.value)}
                    className="col-span-3 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
                  >
                    {Object.values(LanguageLevel)
                      .filter((v) => typeof v === "number")
                      .map((level) => (
                        <option key={level} value={level}>
                          {getLanguageLevelLabel(level as LanguageLevel)}
                        </option>
                      ))}
                  </select>
                  {languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(idx)}
                      className="text-alert hover:text-red-600"
                    >
                      <TrashIcon size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addLanguage}
                className="rounded-lg border border-[#E5E5E3] py-2 px-4 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
              >
                <PlusCircleIcon size={24} className="mr-2" />
                Add Language
              </button>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="rounded-md bg-[#054E72] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
            >
              {isLoading ? "Creating..." : "Create Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-primary-900">
    {label}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  </label>
);

export default CreateProfileForm;

