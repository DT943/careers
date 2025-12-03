"use client";

import React from "react";
import {
  FileTextIcon,
  GraduationCap,
  PaperclipIcon,
  PencilIcon,
  PencilSimpleIcon,
  SuitcaseIcon,
  TrashIcon,
  UserIcon,
} from "@phosphor-icons/react";
import {
  attachments,
  contactInfo,
  educationHistory,
  TimelineItem,
  workHistory,
} from "../Helper/ContentData";

type SectionHeaderProps = {
  title: string;
  icon: React.ReactNode;
  showEditIcon?: boolean;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  showEditIcon = true,
}) => (
  <div className="mb-4 flex items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full text-primary-900">
        {icon}
      </span>
      <h2 className="text-xl font-semibold text-primary-900">{title}</h2>
    </div>
    {showEditIcon && (
      <button type="button" className="text-primary-1 ">
        <PencilIcon size={16} />
      </button>
    )}
  </div>
);

type TimelineListProps = {
  items: TimelineItem[];
};

const TimelineList: React.FC<TimelineListProps> = ({ items }) => (
  <div className="pl-2.5">
    <ol className="relative space-y-6 border-l border-[#054E72]/30 pl-1">
      {items.map((item) => (
        <li key={item.id} className="relative pl-5 text-sm text-slate-700">
          <span className="absolute -left-[11px] h-3.5 w-3.5 rounded-full border-2 border-white bg-primary-1" />
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="text-[13px] text-slate-800">
            {item.companyOrSchool} {item.period && `• ${item.period}`}
          </p>
          <p className="mt-0.5 text-[13px] text-slate-600">{item.location}</p>
          {item.description && (
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-600">
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  </div>
);

// ----- MAIN COMPONENT -----

const CandidateProfile: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl rounded-lg py-2">
      {/* Top: Contact header + reset password */}
      <div className="flex items-start justify-between">
        <SectionHeader
          title="Contact Information"
          icon={<UserIcon size={18} />}
        />
        <button
          type="button"
          className="rounded-md bg-primary-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95"
        >
          Rest password
        </button>
      </div>

      {/* Contact details */}
      <section className="mb-10 border-b border-slate-100 pb-8">
        <div className="grid gap-y-2 gap-x-16 text-sm md:grid-cols-2">
          <ContactRow label="Full Name" value={contactInfo.fullName} />
          <ContactRow label="Email" value={contactInfo.email} />
          <ContactRow label="Location" value={contactInfo.location} />
          <ContactRow
            label="Mobile Phone Number"
            value={contactInfo.mobilePhone}
          />
          <ContactRow label="Date of birth" value={contactInfo.birthDate} />
          <ContactRow label="Address 1" value={contactInfo.address} />
          {contactInfo.portfolioUrl && (
            <ContactRow label="Link" value={contactInfo.portfolioUrl} isLink />
          )}
          {contactInfo.linkedinUrl && (
            <ContactRow
              label="LinkedIn Profile"
              value={contactInfo.linkedinUrl}
              isLink
            />
          )}
        </div>
      </section>

      {/* Attachments */}
      <section className="mb-10 border-b border-slate-100 pb-8">
        <SectionHeader
          title="Attachments"
          icon={<FileTextIcon size={18} />}
          showEditIcon={false}
        />

        <ul className="space-y-3 text-sm">
          {attachments.map((attachment) => (
            <li
              key={attachment.id}
              className="flex items-start justify-between gap-4 text-slate-700"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {attachment.name}{" "}
                  <span className="text-xs text-slate-500">
                    ({attachment.type})
                  </span>
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <button className="underline decoration-slate-400 underline-offset-2 hover:text-sky-700">
                    Download
                  </button>
                  <button className="underline decoration-slate-400 underline-offset-2 hover:text-sky-700">
                    Preview
                  </button>
                  <button className="underline decoration-slate-400 underline-offset-2 hover:text-sky-700">
                    Open new tab
                  </button>
                  <button className="underline decoration-slate-400 underline-offset-2 hover:text-red-600">
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-2 text-slate-400">
                <button className="rounded text-alert">
                  <TrashIcon size={18} />
                </button>
                <button className="rounded text-primary-1">
                  <PencilIcon size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Work history */}
      <section className="mb-4 pb-4">
        <SectionHeader title="Work History" icon={<SuitcaseIcon size={18} />} />
        <TimelineList items={workHistory} />
      </section>

      {/* Education history */}
      <section className="mb-10 pb-8">
        <SectionHeader
          title="Educational History"
          icon={<GraduationCap size={18} />}
        />
        <TimelineList items={educationHistory} />
      </section>
    </div>
  );
};

// ----- SMALL CONTACT ROW COMPONENT -----

type ContactRowProps = {
  label: string;
  value: string;
  isLink?: boolean;
};

const ContactRow: React.FC<ContactRowProps> = ({ label, value, isLink }) => (
  <div>
    <span className="font-semibold text-slate-900">{label}: </span>
    {isLink ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="break-all text-sky-700 hover:underline"
      >
        {value}
      </a>
    ) : (
      <span className="text-slate-800">{value}</span>
    )}
  </div>
);

export default CandidateProfile;
