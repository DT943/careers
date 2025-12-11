"use client";

import React, { useEffect, useState } from "react";
import { ApplicationStepProps, PositionItem, EducationItem } from "@/types/application";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

const EMPTY_POSITION: PositionItem = {
  companyName: "",
  jobTitle: "",
  startDate: "",
  endDate: "",
  currentlyWorkingHere: false,
  description: "",
};

const EMPTY_EDUCATION: EducationItem = {
  institutionName: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  currentlyWorkingHere: false,
};

const ProfessionalInformation: React.FC<ApplicationStepProps> = ({
  data,
  nextStep,
  prevStep,
  updateData,
}) => {
  const [positions, setPositions] = useState<PositionItem[]>(
    data.positions?.length ? data.positions : [EMPTY_POSITION]
  );

  const [educationItems, setEducationItems] = useState<EducationItem[]>(
    data.educationHistory?.length ? data.educationHistory : [EMPTY_EDUCATION]
  );

  useEffect(() => {
    if (data.positions?.length) {
      setPositions(data.positions);
    }
    if (data.educationHistory?.length) {
      setEducationItems(data.educationHistory);
    }
  }, [data.positions, data.educationHistory]);

  const handlePositionChange = (
    index: number,
    field: keyof PositionItem,
    value: string | boolean
  ) => {
    setPositions((prev) => {
      const clone = [...prev];
      clone[index] = { ...clone[index], [field]: value } as PositionItem;
      updateData({ positions: clone });
      return clone;
    });
  };

  const handleClearPosition = (index: number) => {
    setPositions((prev) => {
      const clone = [...prev];
      clone[index] = { ...EMPTY_POSITION };
      return clone;
    });
    updateData({ positions: [{ ...EMPTY_POSITION }] });
  };

  const handleRemovePosition = (index: number) => {
    setPositions((prev) => {
      if (prev.length === 1) {
        const res = [{ ...EMPTY_POSITION }];
        updateData({ positions: res });
        return res;
      }
      const res = prev.filter((_, i) => i !== index);
      updateData({ positions: res });
      return res;
    });
  };

  const handleAddPosition = () => {
    setPositions((prev) => {
      const res = [...prev, { ...EMPTY_POSITION }];
      updateData({ positions: res });
      return res;
    });
  };

  const handleClearAllPosition = () => {
    setPositions([{ ...EMPTY_POSITION }]);
    updateData({ positions: [{ ...EMPTY_POSITION }] });
  };

  const handleEducationChange = (
    index: number,
    field: keyof EducationItem,
    value: string | boolean
  ) => {
    setEducationItems((prev) => {
      const clone = [...prev];
      clone[index] = { ...clone[index], [field]: value } as EducationItem;
      updateData({ educationHistory: clone });
      return clone;
    });
  };

  const handleClearEducationItem = (index: number) => {
    setEducationItems((prev) => {
      const clone = [...prev];
      clone[index] = { ...EMPTY_EDUCATION };
      return clone;
    });
    updateData({ educationHistory: [{ ...EMPTY_EDUCATION }] });
  };

  const handleRemoveEducationItem = (index: number) => {
    setEducationItems((prev) => {
      if (prev.length === 1) {
        const res = [{ ...EMPTY_EDUCATION }];
        updateData({ educationHistory: res });
        return res;
      }
      const res = prev.filter((_, i) => i !== index);
      updateData({ educationHistory: res });
      return res;
    });
  };

  const handleAddEducationItem = () => {
    setEducationItems((prev) => {
      const res = [...prev, { ...EMPTY_EDUCATION }];
      updateData({ educationHistory: res });
      return res;
    });
  };

  const handleClearAllEducation = () => {
    setEducationItems([{ ...EMPTY_EDUCATION }]);
    updateData({ educationHistory: [{ ...EMPTY_EDUCATION }] });
  };

  const handleContinue = () => {
    updateData({
      positions,
      educationHistory: educationItems,
    });
    nextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg py-8 px-12">
      <div className="text-left justify-center mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">
          Enter your professional information
        </h1>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-primary-900">
            Worl History
          </h2>
          <button
            type="button"
            onClick={handleClearAllPosition}
            className="text-xs font-semibold text-alert hover:underline"
          >
            clear
          </button>
        </div>
        <section className="border-2 rounded-xl border-[#E5E5E3] p-6">
          {positions.map((item, index) => (
            <div key={index} className="space-y-4 pb-6 py-2  last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm py-1 font-semibold text-primary-900">
                  Position {index + 1}
                </p>

                <div className="flex items-center gap-3">
                  {positions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePosition(index)}
                      className="text-alert"
                    >
                      <TrashIcon size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    Company Name *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="text"
                      placeholder="EA Sport"
                      value={item.companyName}
                      onChange={(e) =>
                        handlePositionChange(
                          index,
                          "companyName",
                          e.target.value
                        )
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>

                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    Job Title *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="text"
                      placeholder="Senior Backend Developer"
                      value={item.jobTitle}
                      onChange={(e) =>
                        handlePositionChange(index, "jobTitle", e.target.value)
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    Start Date *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="date"
                      value={item.startDate}
                      onChange={(e) =>
                        handlePositionChange(index, "startDate", e.target.value)
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>

                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    End Date *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="date"
                      value={item.endDate}
                      onChange={(e) =>
                        handlePositionChange(index, "endDate", e.target.value)
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id={`position-current-${index}`}
                  type="checkbox"
                  checked={item.currentlyWorkingHere}
                  onChange={(e) =>
                    handlePositionChange(
                      index,
                      "currentlyWorkingHere",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-1 focus:ring-primary-1"
                />
                <label
                  htmlFor={`position-current-${index}`}
                  className="text-sm text-primary-900"
                >
                  Currently Working Here
                </label>
              </div>

              <div className="w-full space-y-1">
                <label className="block text-sm font-medium text-primary-900">
                  Job Description / Key Responsibilities
                </label>
                <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                  <textarea
                    placeholder="Describe your main duties and achievements..."
                    value={item.description}
                    onChange={(e) =>
                      handlePositionChange(index, "description", e.target.value)
                    }
                    className="h-20 flex-1 border-none resize-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              {index === positions.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddPosition}
                  className="mt-4 w-full rounded-xl border border-[#E5E5E3] py-3 flex items-center justify-center text-sm font-semibold text-primary-1 hover:bg-[#F5F5F4]"
                >
                  <PlusCircleIcon size={24} className="mr-2" />
                  Add Another Position
                </button>
              )}
            </div>
          ))}
        </section>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-primary-900">
            Education History
          </h2>
          <button
            type="button"
            onClick={handleClearAllEducation}
            className="text-xs font-semibold text-alert hover:underline"
          >
            clear
          </button>
        </div>
        <section className="border-2 rounded-xl border-[#E5E5E3] p-6">
          {educationItems.map((item, index) => (
            <div
              key={index}
              className="space-y-4 pb-6 py-1 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold py-2 text-primary-900">
                  Education {index + 1}
                </p>

                {educationItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEducationItem(index)}
                    className="text-alert"
                  >
                    <TrashIcon size={20} />
                  </button>
                )}
              </div>

              <div className="w-full space-y-1">
                <label className="block text-sm font-medium text-primary-900">
                  Institution Name *
                </label>
                <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                  <input
                    type="text"
                    placeholder="Damascus university"
                    value={item.institutionName}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "institutionName",
                        e.target.value
                      )
                    }
                    className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    Degree / Qualification *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="text"
                      placeholder="Bachelor of Science"
                      value={item.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>

                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    Field of Study *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="text"
                      placeholder="Aviation Management"
                      value={item.fieldOfStudy}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    Start Date *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="date"
                      value={item.startDate}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>

                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-medium text-primary-900">
                    End Date *
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="date"
                      value={item.endDate}
                      onChange={(e) =>
                        handleEducationChange(index, "endDate", e.target.value)
                      }
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id={`edu-current-${index}`}
                  type="checkbox"
                  checked={item.currentlyWorkingHere}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "currentlyWorkingHere",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-1 focus:ring-primary-1"
                />
                <label
                  htmlFor={`edu-current-${index}`}
                  className="text-sm text-primary-900"
                >
                  Currently attend
                </label>
              </div>

              {index === educationItems.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddEducationItem}
                  className="mt-4 w-full rounded-xl border border-[#E5E5E3] py-3 flex items-center justify-center text-sm font-semibold text-primary-1 hover:bg-[#F5F5F4]"
                >
                  <PlusCircleIcon size={24} className="mr-2" />
                  Add Another Qualification
                </button>
              )}
            </div>
          ))}
        </section>
      </form>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="flex justify-between items-center gap-1 px-8 py-3 rounded-lg font-semibold border border-[#D4D4D2]/50 text-primary-900 hover:bg-[#F5F5F4]"
        >
          <ArrowLeftIcon size={20} /> Previous
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="flex justify-between items-center gap-1 px-8 py-3 rounded-lg border border-primary-1 font-semibold bg-primary-1 text-white hover:opacity-95"
        >
          Continue <ArrowRightIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfessionalInformation;
