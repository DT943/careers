"use client";
import { useState } from "react";
import { ApplicationStepProps } from "@/types/application";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { IoDocumentTextOutline } from "react-icons/io5";
import type { ProfileAttachment } from "@/hooks";
import { FiFileText } from "react-icons/fi";

type ResumeUploadStepProps = ApplicationStepProps & {
  attachments?: ProfileAttachment[];
};

const ResumeUploadStep: React.FC<ResumeUploadStepProps> = ({
  data,
  updateData,
  nextStep,
  attachments = [],
}) => {
  const [error, setError] = useState("");

  const handleSelectAttachment = (attachment: ProfileAttachment) => {
    updateData({
      selectedAttachmentId: attachment.id,
      resumeCode: attachment.fileCode,
    });
    setError("");
  };

  const handleContinue = () => {
    if (!data.resumeCode) {
      setError("Please select a resume to continue");
      return;
    }
    nextStep();
  };

  const selectedId = data.selectedAttachmentId;

  return (
    <div className="bg-white rounded-lg shadow-lg py-8 px-12">
      <div className="text-left justify-center mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">
          Select your resume
        </h1>
        <p className="text-primary-900 text-sm max-w-2xl">
          Choose one of your uploaded attachments from your profile to use as
          your resume for this application. You can manage attachments from your
          profile page.
        </p>
      </div>

      {attachments.length === 0 ? (
        <div className="text-sm text-gray-600 bg-[#F5F5F4] border border-[#E5E5E3] rounded-lg p-4">
          You don&apos;t have any resume attachments yet. Please go to your{" "}
          <a
            href="/profile"
            className="text-primary-1 font-medium hover:underline"
          >
            profile
          </a>{" "}
          and add an attachment, then return here to apply.
        </div>
      ) : (
        <div className="space-y-3">
          {attachments.map((attachment) => {
            const isSelected = selectedId === attachment.id;
            return (
              <button
                key={attachment.id}
                type="button"
                onClick={() => handleSelectAttachment(attachment)}
                className={`w-full flex items-center justify-between p-3 border rounded-lg text-left transition-colors ${
                  isSelected
                    ? "border-primary-1 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="bg-[#054E72]/10 rounded-lg p-2">
                    <FiFileText className="w-5 h-5 text-primary-1 shrink-0" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <a
                      href={attachment.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary-1 hover:underline truncate"
                    >
                      <span className="text-sm font-medium text-primary-1 truncate">
                        {attachment.fileName}
                      </span>
                    </a>
                  </div>
                </div>
                <span
                  className={`ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-primary-1 bg-primary-1 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isSelected ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-alert text-sm mt-4 text-center">{error}</p>}

      <div className="flex justify-end mt-8">
        <button
          onClick={handleContinue}
          disabled={!data.resumeCode || attachments.length === 0}
          className="flex justify-between items-center gap-1 px-8 py-3 rounded-lg font-semibold bg-primary-1 text-white hover:opacity-95 disabled:opacity-50"
        >
          Continue <ArrowRightIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default ResumeUploadStep;
