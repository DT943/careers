import CustomPreviewInformationContainer from "@/components/CustomPreviewInformationContainer";
import {
  CalendarBlankIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import React from "react";
import { FiLinkedin } from "react-icons/fi";

type PersonalInformationPreviewProps = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    nationality: string;
    birthDate: string;
    linkedin: string;
    portfolio: string;
  };
};

const PersonalInformationPreview: React.FC<PersonalInformationPreviewProps> = ({
  personalInfo,
}) => {

  return (
    <CustomPreviewInformationContainer title={"Personal Information"}>
      <div className="space-y-3 p-4 grid grid-cols-2">
        <div className="flex items-start space-x-2">
          <UserIcon size={18} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Full Name</span>
            <span className="font-medium text-primary-900">
              {personalInfo.fullName}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <EnvelopeSimpleIcon size={18} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Email</span>
            <span className="font-medium text-primary-900">
              {personalInfo.email}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <PhoneIcon size={18} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Phone</span>
            <span className="font-medium text-primary-900">
              {personalInfo.phone}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <MapPinIcon size={18} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Location</span>
            <span className="font-medium text-primary-900">
              {personalInfo.location}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <GlobeIcon size={18} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Nationality</span>
            <span className="font-medium text-primary-900">
              {personalInfo.nationality}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <CalendarBlankIcon size={18} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Date of birth</span>
            <span className="font-medium text-primary-900">
              {personalInfo.birthDate}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <FiLinkedin size={16} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Linkedin</span>
            <span className="font-medium text-primary-900">
              {personalInfo.linkedin}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <GlobeIcon size={18} color="#5F5F5C" className="mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Portfolio</span>
            <span className="font-medium text-primary-900">
              {personalInfo.portfolio}
            </span>
          </div>
        </div>
      </div>
    </CustomPreviewInformationContainer>
  );
};

export default PersonalInformationPreview;
