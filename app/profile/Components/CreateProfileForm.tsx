"use client";

import { useState, useRef, useCallback } from "react";
import { useCreateProfile, useParseResume } from "@/hooks";
import { LanguageLevel } from "@/enums";
import { getLanguageLevelLabel } from "@/utils";
import { LANGUAGES } from "@/constants/languages";
import {
  PlusCircleIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useAuthStore } from "@/store/useAuthStore";
import {
  createProfileSchema,
  type CreateProfileFormValues,
  professionalInfoSchema,
} from "@/validations/createProfileSchema";

const TOTAL_STEPS = 3;

const CreateProfileForm = () => {
  const { mutateAsync: createProfile, isLoading } = useCreateProfile();
  const parseResume = useParseResume();
  const { email } = useAuthStore();

  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState<CreateProfileFormValues>({
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

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CreateProfileFormValues, string>>
  >({});
  const [submitError, setSubmitError] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFormChange = (
    field: keyof CreateProfileFormValues,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validatePersonalInfo = () => {
    const result = createProfileSchema.safeParse(form);

    if (result.success) {
      setFormErrors({});
      return true;
    }

    const fieldErrors: Partial<Record<keyof CreateProfileFormValues, string>> =
      {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof CreateProfileFormValues;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    setFormErrors(fieldErrors);
    return false;
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
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
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
    setLanguages((prev) => [
      ...prev,
      { name: "", level: LanguageLevel.Beginner },
    ]);

  const removeLanguage = (idx: number) =>
    setLanguages((prev) => prev.filter((_, i) => i !== idx));

  const validateResumeFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 7 * 1024 * 1024; // 7MB

    if (!validTypes.includes(file.type)) {
      setResumeError("Please upload a PDF, DOC, or DOCX file");
      return false;
    }

    if (file.size > maxSize) {
      setResumeError("File size must be less than 7MB");
      return false;
    }

    setResumeError("");
    return true;
  };

  const handleResumeSelect = useCallback(
    async (file: File) => {
      if (!validateResumeFile(file)) return;

      setResumeFile(file);

      try {
        const result = await parseResume.mutateAsync(file);

        let hasParsedData = false;

        // Prefill skills
        if (result.skills && result.skills.length) {
          setSkills(result.skills);
          hasParsedData = true;
        }

        // Prefill work history
        if (result.experiences && result.experiences.length) {
          setWorkHistory(
            result.experiences.map((exp) => ({
              title: exp.title,
              company: exp.company,
              startDate: exp.startDate?.split("T")[0] ?? "",
              endDate: exp.endDate?.split("T")[0] ?? "",
              isCurrentRole: !exp.endDate,
              city: "",
              country: "",
              responsibilities: exp.description ?? "",
            }))
          );
          hasParsedData = true;
        }

        // Prefill education history
        if (result.educations && result.educations.length) {
          setEducationHistory(
            result.educations.map((edu) => ({
              institution: edu.institution,
              degree: edu.degree,
              fieldOfStudy: "",
              startDate: edu.startDate?.split("T")[0] ?? "",
              endDate: edu.endDate?.split("T")[0] ?? "",
              grade: "",
            }))
          );
          hasParsedData = true;
        }

        // If resume parsing returned any structured data, jump to last step
        if (hasParsedData) {
          setCurrentStep(TOTAL_STEPS);
        } else {
          // Otherwise go to personal information step
          setCurrentStep(2);
        }
      } catch {
        setResumeError("Failed to parse resume. Please try again.");
      }
    },
    [parseResume]
  );

  const handleSubmit = async () => {
    const isValidPersonal = validatePersonalInfo();
    if (!isValidPersonal) {
      if (currentStep !== 2) {
        setCurrentStep(2);
      }
      return;
    }

    setSubmitError("");

    // Validate professional information (step 3)
    const professionalData = {
      skills: skills
        .map((s) => ({ name: s.trim() }))
        .filter((s) => s.name.length > 0),
      workHistory,
      educationHistory,
      languages,
    };

    const professionalResult =
      professionalInfoSchema.safeParse(professionalData);

    if (!professionalResult.success) {
      const firstIssue = professionalResult.error.issues[0];
      setSubmitError(
        firstIssue?.message ||
          "Please complete all required professional information."
      );
      setCurrentStep(TOTAL_STEPS);
      return;
    }

    const fd = new FormData();

    // Personal information
    Object.entries(form).forEach(([key, val]) => {
      if (!val || String(val).length === 0) return;

      if (key === "countryPhoneCode") {
        // Don't send this as a separate field; it's merged into phoneNumber
        return;
      }

      if (key === "phoneNumber") {
        const fullPhone = `${form.countryPhoneCode ?? ""}${
          form.phoneNumber ?? ""
        }`;
        if (fullPhone.trim().length > 0) {
          fd.append("phoneNumber", fullPhone);
        }
        return;
      }

      fd.append(key, val as string);
    });

    // Add email from store if available
    if (email) {
      fd.append("email", email);
    }

    // Resume as attachments array: attachments[0].File
    if (resumeFile) {
      fd.append("attachments[0].File", resumeFile);
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
      fd.append(
        `experiences[${idx}].isCurrentRole`,
        String(work.isCurrentRole)
      );
      fd.append(`experiences[${idx}].city`, work.city);
      fd.append(`experiences[${idx}].country`, work.country);
      if (work.responsibilities) {
        fd.append(
          `experiences[${idx}].responsibilities`,
          work.responsibilities
        );
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
      fd.append(
        `languages[${idx}].level`,
        String(lang.level ?? LanguageLevel.Beginner)
      );
    });

    try {
      await createProfile(fd);
      // The query will automatically refetch after mutation success
    } catch (err: any) {
      console.error("Error creating profile:", err);
      setSubmitError(
        err?.response?.data?.message || "Unable to create profile"
      );
    }
  };

  const goNext = () => {
    if (currentStep === 2) {
      const isValid = validatePersonalInfo();
      if (!isValid) {
        return;
      }
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const renderStep = () => {
    // Step 1: Resume
    if (currentStep === 1) {
      return (
        <>
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-primary-900">
              Upload your resume
            </h2>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                !resumeFile
                  ? "border-gray-300 bg-gray-50 hover:border-gray-400"
                  : parseResume.isLoading
                  ? " border-[#054E72] bg-blue-50"
                  : "border-[#357B47] bg-green-50"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleResumeSelect(file);
                }}
                className="hidden"
              />

              {resumeFile ? (
                <div className="text-primary-1 flex flex-col items-center gap-2">
                  <IoDocumentTextOutline className="w-10 h-10" />
                  <p className="text-sm font-medium">{resumeFile.name}</p>
                  {parseResume.isLoading && (
                    <p className="text-xs text-primary-900">Parsing...</p>
                  )}
                  {!parseResume.isLoading && (
                    <p className="text-xs text-gray-500">
                      Click to change file
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-gray-500">
                  <IoDocumentTextOutline className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs">PDF, DOC, DOCX — maximum size 7MB</p>
                </div>
              )}
            </div>
            {resumeError && (
              <p className="text-alert text-sm mt-2">{resumeError}</p>
            )}
          </section>
        </>
      );
    }

    // Step 2: Personal information
    if (currentStep === 2) {
      return (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-primary-900 mb-2">
              Personal information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="First Name *"
                value={form.firstName}
                onChange={(v) => handleFormChange("firstName", v)}
                error={formErrors.firstName}
              />
              <Field
                label="Last Name *"
                value={form.lastName}
                onChange={(v) => handleFormChange("lastName", v)}
                error={formErrors.lastName}
              />
              {/* <Field
                label="Email *"
                type="email"
                value={email || ""}
                onChange={() => {}}
                disabled={true}
              /> */}
              <Field
                label="Country *"
                value={form.country}
                onChange={(v) => handleFormChange("country", v)}
                error={formErrors.country}
              />
              <Field
                label="City *"
                value={form.city}
                onChange={(v) => handleFormChange("city", v)}
                error={formErrors.city}
              />
              <Field
                label="Country Phone Code *"
                value={form.countryPhoneCode}
                onChange={(v) => handleFormChange("countryPhoneCode", v)}
                placeholder="e.g. +963"
                error={formErrors.countryPhoneCode}
              />
              <Field
                label="Phone Number *"
                value={form.phoneNumber}
                onChange={(v) => handleFormChange("phoneNumber", v)}
                error={formErrors.phoneNumber}
              />
              <Field
                label="Date of Birth *"
                type="date"
                value={form.dateOfBirth}
                onChange={(v) => handleFormChange("dateOfBirth", v)}
                error={formErrors.dateOfBirth}
              />
              <Field
                label="Nationality *"
                value={form.nationality}
                onChange={(v) => handleFormChange("nationality", v)}
                error={formErrors.nationality}
              />
              <Field
                label="LinkedIn Profile (Optional)"
                value={form.linkedInUrl}
                onChange={(v) => handleFormChange("linkedInUrl", v)}
                error={formErrors.linkedInUrl}
              />
              <Field
                label="Portfolio/Website (Optional)"
                value={form.portfolioUrl}
                onChange={(v) => handleFormChange("portfolioUrl", v)}
                error={formErrors.portfolioUrl}
              />
            </div>
          </section>
        </>
      );
    }

    // Step 3: Professional information (Skills, Work History, Education, Languages)
    return (
      <div className="space-y-8">
        {/* Work History */}
        <section>
          <h2 className="text-lg font-semibold text-primary-900 mb-4">
            Work History
          </h2>
          <div className="space-y-4">
            {workHistory.map((work, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
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
              <PlusCircleIcon size={22} className="mr-2" />
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
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Institution"
                    value={edu.institution}
                    onChange={(v) =>
                      handleEducationChange(idx, "institution", v)
                    }
                  />
                  <Field
                    label="Degree"
                    value={edu.degree}
                    onChange={(v) => handleEducationChange(idx, "degree", v)}
                  />
                  <Field
                    label="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(v) =>
                      handleEducationChange(idx, "fieldOfStudy", v)
                    }
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
              <PlusCircleIcon size={22} className="mr-2" />
              Add education
            </button>
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
              <PlusCircleIcon size={22} className="mr-2" />
              Add skill
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
                <select
                  value={lang.name}
                  onChange={(e) =>
                    handleLanguageChange(idx, "name", e.target.value)
                  }
                  className="col-span-8 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
                >
                  <option value="">Select language</option>
                  {LANGUAGES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <select
                  value={lang.level}
                  onChange={(e) =>
                    handleLanguageChange(idx, "level", e.target.value)
                  }
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
              <PlusCircleIcon size={22} className="mr-2" />
              Add Language
            </button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen mx-auto max-w-4xl py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-primary-900 mb-2">
          Create your profile
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          We&apos;ll use this information to prefill your applications and help
          you apply faster.
        </p>
      </div>

      {/* Steps indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex flex-col items-center ${
                step < currentStep
                  ? "text-primary-1"
                  : step === currentStep
                  ? "text-primary-1"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step < currentStep
                    ? "bg-primary-1 outline-2 outline-[#054E72] text-white"
                    : step === currentStep
                    ? "bg-primary-1 outline-2 outline-[#054E72] text-white"
                    : "border-gray-300 bg-gray-300 text-gray-500"
                }`}
              >
                {step < currentStep ? <CheckIcon size={18} /> : step}
              </div>
              <span className="text-xs mt-2 text-center max-w-[90px]">
                {step === 1 && "Select your resume"}
                {step === 2 && "Personal information"}
                {step === 3 && "Professional information"}
              </span>
            </div>
          ))}
        </div>
        {/* <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
          <div
            className="bg-primary-1 h-1 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%`,
            }}
          ></div>
        </div> */}

        <div className="w-[90%] bg-gray-200 -mt-15 ml-10 rounded-full h-1">
          <div
            className="bg-primary-1 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg py-8 px-8 md:px-12 mt-16">
        {submitError && (
          <p className="mb-4 text-sm text-red-500">{submitError}</p>
        )}

        {/* Step content */}
        <div className="space-y-8">{renderStep()}</div>

        {/* Footer buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-xs md:text-sm font-medium text-primary-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon size={16} />
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={isLoading || parseResume.isLoading || !resumeFile}
            className="inline-flex items-center gap-2 rounded-md bg-[#054E72] px-6 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
          >
            {currentStep === TOTAL_STEPS
              ? isLoading
                ? "Creating..."
                : "Save profile"
              : "Continue"}
            {currentStep < TOTAL_STEPS && <ArrowRightIcon size={18} />}
          </button>
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
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-primary-900">
    {label}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`rounded-md border px-3 py-2 text-sm text-primary-900 disabled:bg-gray-100 disabled:cursor-not-allowed ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-gray-200 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
        }`}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </label>
);

export default CreateProfileForm;
