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
} from "@phosphor-icons/react";
import { PencilSimple } from "@phosphor-icons/react";
import EditPersonalInfoModal from "./EditPersonalInfoModal";
import EditResumeModal from "./EditResumeModal";
import EditSkillsModal from "./EditSkillsModal";
import EditWorkHistoryModal from "./EditWorkHistoryModal";
import EditEducationModal from "./EditEducationModal";
import EditLanguagesModal from "./EditLanguagesModal";

type GeneralTabProps = {
  profile?: ApplicantProfile;
  loading?: boolean;
  error?: boolean;
  showSkeleton?: boolean;
};

const languageLabel = (level?: number) => {
  const map: Record<number, string> = {
    0: "Beginner",
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "Native",
  };
  return level !== undefined ? map[level] ?? "Unknown" : "Unknown";
};

const GeneralTab = ({
  profile,
  loading,
  error,
  showSkeleton,
}: GeneralTabProps) => {
  if (showSkeleton || loading) return <CandidateProfileSkeleton />;
  if (error)
    return <p className="text-red-500 text-sm">Failed to load profile.</p>;
  if (!profile) return null;

  const [showEdit, setShowEdit] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showEdu, setShowEdu] = useState(false);
  const [showLang, setShowLang] = useState(false);

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
              value={profile.dateOfBirth.split("T")[0]}
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
      <Card>
        <CardHeader
          title="Skills"
          icon={<LightningIcon size={20} />}
          rightNode={
            <button
              onClick={() => setShowSkills(true)}
              className="text-primary-1 hover:opacity-80"
              aria-label="Edit skills"
            >
              <PencilIcon size={18} />
            </button>
          }
        />
        <div className="flex flex-wrap gap-2 text-xs">
          {profile.skills.length === 0 && (
            <p className="text-sm text-primary-900">No skills added.</p>
          )}
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

      {/* Work History */}
      <Card>
        <CardHeader
          title="Work History"
          icon={<SuitcaseIcon size={20} />}
          rightNode={
            <button
              onClick={() => setShowWork(true)}
              className="text-primary-1 hover:opacity-80"
              aria-label="Edit work history"
            >
              <PencilIcon size={18} />
            </button>
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
          {profile.experiences.length === 0 && (
            <p className="text-sm text-primary-900">No work history.</p>
          )}
        </Timeline>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader
          title="Educational History"
          icon={<GraduationCapIcon size={20} />}
          rightNode={
            <button
              onClick={() => setShowEdu(true)}
              className="text-primary-1 hover:opacity-80"
              aria-label="Edit education"
            >
              <PencilIcon size={18} />
            </button>
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
          {profile.educations.length === 0 && (
            <p className="text-sm text-primary-900">No education history.</p>
          )}
        </Timeline>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader
          title="Languages"
          icon={<TranslateIcon size={20} />}
          rightNode={
            <button
              onClick={() => setShowLang(true)}
              className="text-primary-1 hover:opacity-80"
              aria-label="Edit languages"
            >
              <PencilIcon size={18} />
            </button>
          }
        />
        <div className="space-y-2 text-sm">
          {profile.languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-2">
              <span className="font-semibold text-primary-900">
                {lang.name}
              </span>
              <span className="text-primary-1 text-xs">
                {languageLabel(lang.level)}
              </span>
            </div>
          ))}
          {profile.languages.length === 0 && (
            <p className="text-sm text-primary-900">No languages listed.</p>
          )}
        </div>
      </Card>

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
      />
      <EditWorkHistoryModal
        open={showWork}
        onClose={() => setShowWork(false)}
        profile={profile}
      />
      <EditEducationModal
        open={showEdu}
        onClose={() => setShowEdu(false)}
        profile={profile}
      />
      <EditLanguagesModal
        open={showLang}
        onClose={() => setShowLang(false)}
        profile={profile}
      />
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md max-w-3xl flex flex-col items-start justify-start w-full border border-[#E5E5E3] p-4">
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
