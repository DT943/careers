"use client";

import {
  ArrowLeftIcon,
  EnvelopeSimpleIcon,
  LockIcon,
} from "@phosphor-icons/react";
import { FaGoogle } from "react-icons/fa6";
import AuthCardContainer from "@/components/AuthCardContainer";
import Link from "next/link";

const SignInSection = () => {
  return (
    <div className="flex flex-col py-10">
      <div className="flex items-center justify-center">
        <AuthCardContainer title={"Sign In"}>
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

              <div className="space-y-1">
                <label className="block text-sm font-normal text-primary-900">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2.5 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
                  <LockIcon color="#4a5565" size={18} />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-primary-900">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-gray-300 text-[#054E72] focus:ring-[#054E72]"
                  />
                  <span>Remember me</span>
                </label>
                <Link href="/password-recovery">
                  <button
                    type="button"
                    className="text-sm text-primary-1 hover:underline"
                  >
                    Forgot password?
                  </button>
                </Link>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-[#054E72] py-3 text-sm font-semibold text-white hover:bg-[#043a56] transition"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-black">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="font-semibold text-[#054E72] hover:underline"
              >
                Create one
              </a>
            </p>
          </div>
        </AuthCardContainer>
      </div>
    </div>
  );
};

export default SignInSection;
