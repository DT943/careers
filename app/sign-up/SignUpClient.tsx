"use client";

import {
  ArrowLeftIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";
import { FaGoogle } from "react-icons/fa6";
import AuthCardContainer from "@/components/AuthCardContainer";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col py-10">
      <div className="py-2 p-2 flex items-left justify-left lg:items-center lg:justify-center max-w-4xl">
        {" "}
        <Link href="/jobs">
          <h5 className=" flex gap-1 items-center text-[#00253C] hover:text-[#3A5A6B] text-sm font-medium">
            <ArrowLeftIcon size={18} /> Back to all jobs
          </h5>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <AuthCardContainer
          title={"Create Account"}
          subtitle={
            <>
              <h3 className="mb-2">
                Before applying, you’ll need to sign in or create a new FlyCham
                Careers account.
              </h3>
              <h3 className="mb-2">This allows you to:</h3>
              <h3 className="flex items-center gap-1">
                <IoMdCheckmarkCircleOutline />
                Track your applications
              </h3>
              <h3 className="flex items-center gap-1">
                <IoMdCheckmarkCircleOutline />
                Save jobs for later
              </h3>
              <h3 className="flex items-center gap-1">
                <IoMdCheckmarkCircleOutline />
                Receive updates about your application status
              </h3>
            </>
          }
        >
          <div className="">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold">
                <FaGoogle size={20} color="#00253C" />
              </span>
              <span>Continue with google</span>
            </button>

            <div className="flex items-center gap-4 my-4">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
                or
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <form className="space-y-4">
              <div className="flex gap-2 w-full">
                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-normal text-primary-900">
                    First Name
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2.5 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>

                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-normal text-primary-900">
                    Last Name
                  </label>
                  <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2.5 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

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

              <div className="flex items-center justify-between text-sm text-[#717182]">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-gray-300 text-[#054E72] focus:ring-[#054E72]"
                  />
                  <span className="font-normal">
                    I agree to the{" "}
                    <span className="text-primary-1 font-medium">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-primary-1 font-medium">
                      Privacy Policy{" "}
                    </span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-[#054E72] py-3 text-sm font-semibold text-white hover:bg-[#043a56] transition"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-black">
              Already have account ?{" "}
              <a
                href="/sign-in"
                className="font-semibold text-[#054E72] hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </AuthCardContainer>
      </div>
    </div>
  );
};

export default SignUp;
