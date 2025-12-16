"use client";

import { ApplicantProfile } from "@/hooks";
import { useState } from "react";
import CandidateProfileSkeleton from "./CandidateProfileSkeleton";
import {
  MapPin,
  PencilSimpleIcon,
  FileTextIcon,
  SuitcaseIcon,
  UserIcon,
  TranslateIcon,
  PencilIcon,
  LightningIcon,
  GraduationCapIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";
import { PencilSimple } from "@phosphor-icons/react";
import EditPersonalInfoModal from "./EditPersonalInfoModal";
import EditResumeModal from "./EditResumeModal";
import EditSkillsModal from "./EditSkillsModal";
import EditWorkHistoryModal from "./EditWorkHistoryModal";
import EditEducationModal from "./EditEducationModal";
import EditLanguagesModal from "./EditLanguagesModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { getLanguageLevelLabel } from "@/utils";
import { useUpdateProfile } from "@/hooks";

type GeneralTabProps = {
  profile?: ApplicantProfile;
  loading?: boolean;
  error?: boolean;
  showSkeleton?: boolean;
};

const GeneralTab = ({
  profile,
  loading,
  error,
  showSkeleton,
}: GeneralTabProps) => {
  // Hooks must be called before any conditional returns
  const { mutateAsync: updateProfile, isLoading: isDeleting } =
    useUpdateProfile();
  const [showEdit, setShowEdit] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showEdu, setShowEdu] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [skillsMode, setSkillsMode] = useState<"edit" | "add">("edit");
  const [workMode, setWorkMode] = useState<"edit" | "add">("edit");
  const [eduMode, setEduMode] = useState<"edit" | "add">("edit");
  const [langMode, setLangMode] = useState<"edit" | "add">("edit");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "skills" | "experiences" | "educations" | "languages" | null;
    open: boolean;
  }>({ type: null, open: false });

  if (showSkeleton || loading) return <CandidateProfileSkeleton />;
  if (error)
    return <p className="text-red-500 text-sm">Failed to load profile.</p>;
  if (!profile) return null;

  const handleDelete = async (
    type: "skills" | "experiences" | "educations" | "languages"
  ) => {
    const fd = new FormData();
    // Send empty array by appending the field name with "null" as string value
    // Backend expects FormData format, and based on user requirement: "send : skills : null"
    // We send it as a string "null" which the backend should interpret as null/empty array
    if (type === "skills") {
      fd.append("skills", "null");
    } else if (type === "experiences") {
      fd.append("experiences", "null");
    } else if (type === "educations") {
      fd.append("educations", "null");
    } else if (type === "languages") {
      fd.append("languages", "null");
    }
    try {
      await updateProfile(fd);
      setDeleteConfirm({ type: null, open: false });
    } catch (error) {
      console.error("Error deleting:", error);
      // Keep modal open on error so user can retry
    }
  };

  return (
    <div className="space-y-4 mb-4">
      {/* Personal Information */}
      <div className="flex items-start justify-between">
        <Card>
          <CardHeader
            title="Personal Information"
            icon={<UserIcon size={20} />}
            rightNode={
              <button
                onClick={() => setShowEdit(true)}
                className="text-primary-1 hover:opacity-80"
                aria-label="Edit personal information"
              >
                <PencilIcon size={18} />
              </button>
            }
          />
          <div className="grid md:grid-cols-2 gap-y-3 text-sm text-primary-900">
            <InfoRow
              label="Full Name"
              value={`${profile.firstName} ${profile.lastName}`}
            />
            <InfoRow label="Email" value={profile.email} />
            <InfoRow
              label="Location"
              value={`${profile.city}, ${profile.country}`}
            />
            <InfoRow label="Mobile Phone Number" value={profile.phoneNumber} />
            <InfoRow
              label="Date of birth"
              value={profile.dateOfBirth?.split("T")[0] ?? ""}
            />
            <InfoRow label="Nationality" value={profile.nationality} />
            {profile.portfolioUrl && (
              <InfoRow label="Link" value={profile.portfolioUrl} isLink />
            )}
            {profile.linkedInUrl && (
              <InfoRow
                label="LinkedIn Profile"
                value={profile.linkedInUrl}
                isLink
              />
            )}
          </div>
        </Card>
        {/* <ResetPasswordButton /> */}
      </div>

      {/* Resume */}
      <Card>
        <CardHeader
          title="Resume"
          icon={<FileTextIcon size={20} />}
          rightNode={
            <button
              onClick={() => setShowResume(true)}
              className="text-primary-1 hover:opacity-80"
              aria-label="Edit personal information"
            >
              <PencilIcon size={18} />
            </button>
          }
        />
        <div className="text-sm text-primary-900">
          <p className="mb-2">
            {profile.resumeUrl ? "Resume" : "No resume uploaded"}
          </p>
          {profile.resumeUrl && (
            <div className="flex flex-wrap gap-3 text-xs">
              <a
                className="underline text-primary-1"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
              <a
                className="underline text-primary-1"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open new tab
              </a>
            </div>
          )}
        </div>
      </Card>

      {/* Skills */}
      {profile.skills.length === 0 ? (
        <Card className="bg-gray-100">
          <CardHeader
            title="Skills"
            icon={<LightningIcon size={20} />}
            rightNode={null}
          />
          <div className="w-full">
            <button
              onClick={() => setShowSkills(true)}
              className="w-full rounded-xl border border-[#E5E5E3] py-3 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
            >
              <PlusCircleIcon size={24} className="mr-2" />
              Add Skill
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <CardHeader
            title="Skills"
            icon={<LightningIcon size={20} />}
            rightNode={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowSkills(true);
                    setSkillsMode("add");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Add skill"
                >
                  <PlusCircleIcon size={18} />
                </button>
                <button
                  onClick={() => {
                    setShowSkills(true);
                    setSkillsMode("edit");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Edit skills"
                >
                  <PencilIcon size={18} />
                </button>

                <button
                  onClick={() =>
                    setDeleteConfirm({ type: "skills", open: true })
                  }
                  className="text-alert hover:opacity-80"
                  aria-label="Delete skills"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            }
          />
          <div className="flex flex-wrap gap-2 text-xs">
            {profile.skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-primary-1/40 text-primary-1 px-2 py-1 bg-white"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Work History */}
      {profile.experiences.length === 0 ? (
        <Card className="bg-gray-100">
          <CardHeader
            title="Work History"
            icon={<SuitcaseIcon size={20} />}
            rightNode={null}
          />
          <div className="w-full">
            <button
              onClick={() => setShowWork(true)}
              className="w-full rounded-xl border border-[#E5E5E3] py-3 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1 "
            >
              <PlusCircleIcon size={24} className="mr-2" />
              Add Work History
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <CardHeader
            title="Work History"
            icon={<SuitcaseIcon size={20} />}
            rightNode={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowWork(true);
                    setWorkMode("add");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Add work history"
                >
                  <PlusCircleIcon size={18} />
                </button>
                <button
                  onClick={() => {
                    setShowWork(true);
                    setWorkMode("edit");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Edit work history"
                >
                  <PencilIcon size={18} />
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ type: "experiences", open: true })
                  }
                  className="text-alert hover:opacity-80"
                  aria-label="Delete work history"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            }
          />
          <Timeline>
            {profile.experiences.map((exp) => (
              <TimelineItem
                key={exp.id}
                title={exp.title}
                subtitle={exp.company}
                period={`${exp.startDate.split("T")[0]} - ${
                  exp.isCurrentRole ? "Present" : ""
                }`}
                location={`${exp.city}, ${exp.country}`}
                description={exp.responsibilities}
              />
            ))}
          </Timeline>
        </Card>
      )}

      {/* Education */}
      {profile.educations.length === 0 ? (
        <Card className="bg-gray-100">
          <CardHeader
            title="Educational History"
            icon={<GraduationCapIcon size={20} />}
            rightNode={null}
          />
          <div className="w-full">
            <button
              onClick={() => setShowEdu(true)}
              className="w-full rounded-xl border border-[#E5E5E3] py-3 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
            >
              <PlusCircleIcon size={24} className="mr-2" />
              Add Education
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <CardHeader
            title="Educational History"
            icon={<GraduationCapIcon size={20} />}
            rightNode={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowEdu(true);
                    setEduMode("add");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Add education"
                >
                  <PlusCircleIcon size={18} />
                </button>
                <button
                  onClick={() => {
                    setShowEdu(true);
                    setEduMode("edit");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Edit education"
                >
                  <PencilIcon size={18} />
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ type: "educations", open: true })
                  }
                  className="text-alert hover:opacity-80"
                  aria-label="Delete education"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            }
          />
          <Timeline>
            {profile.educations.map((edu) => (
              <TimelineItem
                key={edu.id}
                title={edu.degree}
                subtitle={edu.institution}
                period={`${edu.startDate.split("T")[0]} - ${
                  edu.endDate?.split("T")[0] ?? ""
                }`}
                location={edu.fieldOfStudy}
                description={edu.grade ? `Grade: ${edu.grade}` : ""}
              />
            ))}
          </Timeline>
        </Card>
      )}

      {/* Languages */}
      {profile.languages.length === 0 ? (
        <Card className="bg-gray-100">
          <CardHeader
            title="Languages"
            icon={<TranslateIcon size={20} />}
            rightNode={null}
          />
          <div className="w-full">
            <button
              onClick={() => setShowLang(true)}
              className="w-full rounded-xl border border-[#E5E5E3] py-3 flex items-center justify-center text-sm font-semibold text-white hover:opacity-90 bg-primary-1"
            >
              <PlusCircleIcon size={24} className="mr-2" />
              Add Language
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <CardHeader
            title="Languages"
            icon={<TranslateIcon size={20} />}
            rightNode={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowLang(true);
                    setLangMode("add");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Add language"
                >
                  <PlusCircleIcon size={18} />
                </button>
                <button
                  onClick={() => {
                    setShowLang(true);
                    setLangMode("edit");
                  }}
                  className="text-primary-1 hover:opacity-80"
                  aria-label="Edit languages"
                >
                  <PencilIcon size={18} />
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ type: "languages", open: true })
                  }
                  className="text-alert hover:opacity-80"
                  aria-label="Delete languages"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            }
          />
          <div className="space-y-2 text-sm">
            {profile.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2">
                <span className="font-semibold text-primary-900">
                  {lang.name}
                </span>
                <span className="text-primary-1 text-xs">
                  {getLanguageLevelLabel(lang.level)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <EditPersonalInfoModal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        profile={profile}
      />
      <EditResumeModal
        open={showResume}
        onClose={() => setShowResume(false)}
        profile={profile}
      />
      <EditSkillsModal
        open={showSkills}
        onClose={() => setShowSkills(false)}
        profile={profile}
        mode={skillsMode}
      />
      <EditWorkHistoryModal
        open={showWork}
        onClose={() => setShowWork(false)}
        profile={profile}
        mode={workMode}
      />
      <EditEducationModal
        open={showEdu}
        onClose={() => setShowEdu(false)}
        profile={profile}
        mode={eduMode}
      />
      <EditLanguagesModal
        open={showLang}
        onClose={() => setShowLang(false)}
        profile={profile}
        mode={langMode}
      />
      <DeleteConfirmationModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ type: null, open: false })}
        onConfirm={() => deleteConfirm.type && handleDelete(deleteConfirm.type)}
        title={`Delete ${
          deleteConfirm.type === "skills"
            ? "Skills"
            : deleteConfirm.type === "experiences"
            ? "Work History"
            : deleteConfirm.type === "educations"
            ? "Education History"
            : "Languages"
        }?`}
        message={`Are you sure you want to delete all ${
          deleteConfirm.type === "skills"
            ? "skills"
            : deleteConfirm.type === "experiences"
            ? "work history entries"
            : deleteConfirm.type === "educations"
            ? "education history entries"
            : "languages"
        }? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-md max-w-3xl flex flex-col items-start justify-start w-full border border-[#E5E5E3] p-4 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({
  title,
  icon,
  rightNode,
}: {
  title: string;
  icon?: React.ReactNode;
  rightNode?: React.ReactNode;
}) => (
  <div className=" gap-8 mb-3 flex items-center justify-between w-full">
    <div className="flex items-center gap-2 text-primary-900">
      {icon && <span>{icon}</span>}
      <h3 className="text-base font-semibold">{title}</h3>
    </div>
    <div className="flex justify-end items-center">{rightNode}</div>
  </div>
);

const InfoRow = ({
  label,
  value,
  isLink,
}: {
  label: string;
  value?: string;
  isLink?: boolean;
}) => (
  <div>
    <span className="font-semibold">{label}: </span>
    {isLink ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-primary-1 hover:underline break-all"
      >
        {value}
      </a>
    ) : (
      <span className="text-primary-900">{value || "—"}</span>
    )}
  </div>
);

const Timeline = ({ children }: { children: React.ReactNode }) => (
  <div className="relative pl-4 space-y-4 before:absolute before:left-3.5 before:top-3 before:bottom-0 before:w-px before:bg-gray-300">
    {children}
  </div>
);

const TimelineItem = ({
  title,
  subtitle,
  period,
  location,
  description,
}: {
  title: string;
  subtitle?: string;
  period?: string;
  location?: string;
  description?: string;
}) => (
  <div className="relative pl-4">
    <span className="absolute left-[-7px] top-1.5 h-3 w-3 rounded-full bg-primary-1" />
    <p className="text-sm font-semibold text-primary-900">{title}</p>
    {subtitle && <p className="text-xs text-primary-900">{subtitle}</p>}
    <div className="flex flex-wrap gap-2 text-xs text-primary-900">
      {period && <span>{period}</span>}
      {location && (
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} /> {location}
        </span>
      )}
    </div>
    {description && (
      <p className="mt-1 text-xs text-primary-900 leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

const ResetPasswordButton = () => (
  <button className="rounded-md bg-primary-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95">
    Reset password
  </button>
);

export default GeneralTab;
