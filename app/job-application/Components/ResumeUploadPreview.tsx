import React from "react";
import CustomPreviewInformationContainer from "@/components/CustomPreviewInformationContainer";
import type { ProfileAttachment } from "@/hooks";
import { CheckCircleIcon, FileTextIcon } from "@phosphor-icons/react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";

type ResumeUploadPreviewProps = {
  selectedAttachment: ProfileAttachment | undefined;
};

const ResumeUploadPreview: React.FC<ResumeUploadPreviewProps> = ({
  selectedAttachment,
}) => {
  return (
    <CustomPreviewInformationContainer title={"Resume"}>
      <div className="space-y-3 p-4 grid grid-cols-2">
        <div className="flex items-start space-x-2">
          <div className="flex flex-row items-center justify-center gap-x-4">
            <span className="bg-[#054E72]/10 rounded-lg p-2">
              <FiFileText size={20} color="#054E72" />
            </span>
            <a
              href={selectedAttachment?.fileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-primary-900 underline">
                {selectedAttachment?.fileName}
              </span>
            </a>
            <span>
              <CheckCircleIcon size={20} color="#00BC7D" />
            </span>
          </div>
        </div>
      </div>
    </CustomPreviewInformationContainer>
  );
};

export default ResumeUploadPreview;
