"use client";

import { ArrowLeftIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import AuthCardContainer from "@/components/AuthCardContainer";
import Link from "next/link";

const PasswordRecoveryClient = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="py-12 p-2 flex items-left justify-left lg:items-center lg:justify-center max-w-4xl">
        {" "}
        <Link href="/jobs">
          <h5 className=" flex gap-1 items-center text-[#00253C] hover:text-[#3A5A6B] text-sm font-medium">
            <ArrowLeftIcon size={18} /> Back to all jobs
          </h5>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <AuthCardContainer
          title={"Password Recovery"}
          subtitle={
            <>
              <h3 className="mb-2 justify-center items-center">
                Enter the email address associated with your account to change
                or set a password
              </h3>
            </>
          }
        >
          <div className="pt-24">
            <form className="space-y-2">
              <div className="space-y-1">
                <label className="block text-sm font-normal text-primary-900">
                  Email Address
                </label>
                <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2.5 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                  <EnvelopeSimpleIcon color="#4a5565" size={18} />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-[#054E72] py-3 text-sm font-semibold text-white hover:bg-[#043a56] transition"
              >
                Next
              </button>

              <button
                type="submit"
                className="w-full rounded-md border border-[#054E72] py-3 text-sm font-semibold text-primary-1 hover:bg-[#F5F5F4] transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </AuthCardContainer>
      </div>
    </div>
  );
};

export default PasswordRecoveryClient;
