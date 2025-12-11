"use client";
import { useState, useRef, useCallback } from "react";
import { ApplicationStepProps, PositionItem, EducationItem } from "@/types/application";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  UploadIcon,
} from "@phosphor-icons/react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useParseResume } from "@/hooks";

const ResumeUploadStep: React.FC<ApplicationStepProps> = ({
  data,
  updateData,
  nextStep,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const parseResume = useParseResume();

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 7 * 1024 * 1024; // 7MB

    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC, or DOCX file");
      return false;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 7MB");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileSelect = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        updateData({ resume: file, resumeUrl: URL.createObjectURL(file) });
        setIsUploading(true);
        parseResume.mutateAsync(file)
          .then((result) => {
            const mappedPositions: PositionItem[] =
              result?.experiences?.map((exp) => ({
                companyName: exp.company,
                jobTitle: exp.title,
                startDate: exp.startDate?.split("T")[0] ?? "",
                endDate: exp.endDate?.split("T")[0] ?? "",
                currentlyWorkingHere: !exp.endDate,
                description: exp.description ?? "",
              })) ?? [];

            const mappedEdu: EducationItem[] =
              result?.educations?.map((edu) => ({
                institutionName: edu.institution,
                degree: edu.degree,
                fieldOfStudy: "",
                startDate: edu.startDate?.split("T")[0] ?? "",
                endDate: edu.endDate?.split("T")[0] ?? "",
                currentlyWorkingHere: !edu.endDate,
              })) ?? [];

            updateData({
              resumeCode: result.resumeCode,
              resumeUrl: result.resumeUrl,
              skills: result.skills ?? [],
              positions: mappedPositions.length ? mappedPositions : data.positions,
              educationHistory: mappedEdu.length ? mappedEdu : data.educationHistory,
            });
          })
          .catch(() => {
            setError("Failed to parse resume. Please try again.");
          })
          .finally(() => setIsUploading(false));
      }
    },
    [updateData, data.positions, data.educationHistory, parseResume]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (!data.resume) {
      setError("Please upload your resume to continue");
      return;
    }
    if (isUploading) return;
    nextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg py-8 px-12">
      <div className="text-left justify-center mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">
          First time applicant
        </h1>
        <p className="text-primary-900 text-sm max-w-2xl">
          Choose a method from the options below to submit your resume. Maximum
          file size is 7MB. If needed, you can upload or link to additional
          documents, such as your portfolio, on the next page of the application
          process.
        </p>
      </div>

      {/* File Upload Area */}
      <div className="">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : data.resume
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleBrowseClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />

          {data.resume ? (
            <div className="text-primary-1">
              <div className="flex justify-center items-center gap-2">
                <IoDocumentTextOutline className="w-10 h-10 " />
              </div>
              <p className="text-lg font-semibold mb-2"></p>
              <div className="flex justify-center items-center gap-2">
                <p className="text-sm text-primary-1">{data.resume.name}</p>{" "}
                {!isUploading && <CheckCircleIcon className="w-6 h-6 text-green-600" />}
                {isUploading && <span className="text-xs text-primary-900">Parsing...</span>}
              </div>
              {/* <p className="text-sm text-gray-500">
                {(data.resume.size / (1024 * 1024)).toFixed(2)} MB
              </p> */}
              <p className="text-sm text-gray-500 mt-2">Click to change file</p>{" "}
            </div>
          ) : (
            <div className="text-gray-400">
              <UploadIcon className=" mx-auto mb-2" size={36} weight="fill" />

              <p className="text-sm font-medium mb-2 text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-sm font-normal text-gray-500 mb-4">
                PDF, DOC, DOCX (MAX: 800 x 400 px)
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="text-alert text-sm mt-4 text-center">{error}</p>
        )}

        <div
          className={`${
            data?.resume ? "" : "mt-18"
          } flex justify-between items-center`}
        >
          <div></div>
          {data?.resume && (
            <button
              onClick={handleContinue}
              disabled={!data.resume}
              className={`mt-8 flex justify-between items-center gap-1 px-8 py-3 rounded-lg font-semibold bg-primary-1 text-white hover:opacity-95`}
            >
              Continue <ArrowRightIcon size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadStep;
