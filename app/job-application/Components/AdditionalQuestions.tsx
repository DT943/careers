"use client";
import DatePickerField from "@/components/DatePickerField";
import { ApplicationStepProps } from "@/types/application";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const AdditionalQuestions: React.FC<ApplicationStepProps> = ({
  data,
  nextStep,
  prevStep,
  updateData,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    data.hasRelatives ? "yes" : data.hasRelatives === false ? "no" : ""
  );
  const [selectedWorked, setSelectedWorked] = useState(
    data.hasWorkedBefore ? "yes" : data.hasWorkedBefore === false ? "no" : ""
  );

  return (
    <div className="bg-white rounded-lg shadow-lg py-8 px-12">
      <div className="text-left justify-center mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">
          Additional Questions
        </h1>
      </div>

      <form className="space-y-4">
        <div className="flex gap-4 w-full">
          <div className="w-full space-y-4">
            <label className="block text-sm font-medium text-primary-900">
              Have you ever worked at FlyCham before (employee, intern) ?
            </label>
            <div className="flex gap-8">
              {/* Yes Option */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="agreement"
                    value="yes"
                    checked={selectedWorked === "yes"}
                    onChange={(e) => {
                      setSelectedWorked(e.target.value);
                      updateData({ hasWorkedBefore: e.target.value === "yes" });
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedWorked === "yes"
                        ? "border-[#054E72]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedWorked === "yes" && (
                      <div className="w-3 h-3 bg-primary-1 rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-primary-900">Yes</span>
              </label>

              {/* No Option */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="agreement"
                    value="no"
                    checked={selectedWorked === "no"}
                    onChange={(e) => {
                      setSelectedWorked(e.target.value);
                      updateData({ hasWorkedBefore: e.target.value === "yes" });
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedWorked === "no"
                        ? "border-[#054E72]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedWorked === "no" && (
                      <div className="w-3 h-3 bg-primary-1 rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-primary-900">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-full space-y-4">
            <label className="block text-sm font-medium text-primary-900">
              Do you have any relatives currently working at FlyCham?{" "}
            </label>
            <div className="flex gap-8">
              {/* Yes Option */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="agreement"
                    value="yes"
                    checked={selectedOption === "yes"}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      updateData({ hasRelatives: e.target.value === "yes" });
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedOption === "yes"
                        ? "border-[#054E72]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === "yes" && (
                      <div className="w-3 h-3 bg-primary-1 rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-primary-900">Yes</span>
              </label>

              {/* No Option */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="agreement"
                    value="no"
                    checked={selectedOption === "no"}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      updateData({ hasRelatives: e.target.value === "yes" });
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedOption === "no"
                        ? "border-[#054E72]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === "no" && (
                      <div className="w-3 h-3 bg-primary-1 rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-primary-900">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-full space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Why do you want to join Fly Cham ?
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <textarea
                placeholder="Tell us what excites you about us and this role..."
                value={data.whyJoin}
                onChange={(e) => updateData({ whyJoin: e.target.value })}
                className="h-20 flex-1 border-none resize-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-full space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              How did you hear about this job posting? (optional)⁠
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <input
                type="text"
                placeholder="Company Website"
                value={data.howHear}
                onChange={(e) => updateData({ howHear: e.target.value })}
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Years of Experience *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <input
                type="text"
                placeholder="1-3 years"
                value={data.yearsOfExperience}
                onChange={(e) =>
                  updateData({ yearsOfExperience: e.target.value })
                }
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              When can you start? *
            </label>
            {/* <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <input
                type="date"
                placeholder="17-12-2025"
                value={data.whenCanYouStart}
                onChange={(e) =>
                  updateData({ whenCanYouStart: e.target.value })
                }
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div> */}
            <DatePickerField
              label=""
              inputClassName="rounded-md border border-[#F5F5F4] bg-[#F5F5F4] focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72] py-3 -mt-1"
              value={data.whenCanYouStart}
              onChange={(date) =>
                updateData({ whenCanYouStart: date?.toISOString() })
              }
            />
          </div>
        </div>

        <div className="w-full space-y-1">
          <label className="block text-sm font-medium text-primary-900">
            Expected Salary *
          </label>
          <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
            <input
              type="text"
              placeholder="e.g., USD 1,000 per month"
              value={data.expectedSalary}
              onChange={(e) => updateData({ expectedSalary: e.target.value })}
              className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>
        </div>
      </form>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className={`flex justify-between items-center gap-1 px-8 py-3 rounded-lg font-semibold border border-[#D4D4D2]/50 text-primary-900 hover:bg-[#F5F5F4]`}
        >
          <ArrowLeftIcon size={20} /> Previous
        </button>

        <button
          onClick={nextStep}
          className={`flex justify-between items-center gap-1 px-8 py-3 rounded-lg border border-primary-1 font-semibold bg-primary-1 text-white hover:opacity-95`}
        >
          Continue <ArrowRightIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdditionalQuestions;
