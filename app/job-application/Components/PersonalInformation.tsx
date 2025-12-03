"use client";
import { ApplicationStepProps } from "@/types/application";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import { FiLinkedin } from "react-icons/fi";

const PersonalInformation: React.FC<ApplicationStepProps> = ({
  data,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg py-8 px-12">
      <div className="text-left justify-center mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">
          Enter your personal information
        </h1>
      </div>

      <form className="space-y-4">
        <div className="flex gap-4 w-full">
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              First Name *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <input
                type="text"
                placeholder="Enter your first name"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Last Name *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <input
                type="text"
                placeholder="Enter your last name"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-full space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Email *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <EnvelopeSimpleIcon color="#4a5565" size={18} />
              <input
                type="email"
                placeholder="Mouayadhawari@gmail.com"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="w-[40%] space-y-1">
              <label className="block text-sm font-medium text-primary-900">
                Country Phone Code *
              </label>
              <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            <div className="w-[60%] space-y-1">
              <label className="block text-sm font-medium text-primary-900">
                Phone Number *
              </label>
              <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Country *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <input
                type="text"
                placeholder="Enter your first name"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              City *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <input
                type="text"
                placeholder="Enter your last name"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Date of Birth *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">

              <input
                type="date"
                placeholder="17-02-2001"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Nationality *
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">

              <input
                type="text"
                placeholder="Syrian"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Linkedin Profile (Optional)
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <FiLinkedin color="#4a5565" size={16} />

              <input
                type="text"
                placeholder="linkedin.com/in/yourprofile"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium text-primary-900">
              Portfolio/Website (Optional)
            </label>
            <div className="flex items-center gap-3 rounded-md border border-[#F5F5F4] bg-[#F5F5F4] p-3 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
              <GlobeIcon color="#4a5565" size={18} />

              <input
                type="text"
                placeholder="yourwebsite.com"
                className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
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

export default PersonalInformation;
