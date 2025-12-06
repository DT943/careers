"use client";

import { EnvelopeSimpleIcon, LockIcon } from "@phosphor-icons/react";
import { FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormValues } from "@/validations/signInSchema";
import { authService } from "@/services/Auth";
import { SignInResponse } from "@/types/Auth";
import GoogleAuthButton from "./GoogleAuthButton";

type SignInCardProps = {
  defaultEmail?: string | null;
  onLoggedIn: (payload: {
    token: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }) => void;
  onRequireFirstLoginOtp: (payload: { email: string; token: string }) => void;
  onSwitchToCreateAccount: () => void;
  onForgotPassword: () => void;
};

const SignInCard: React.FC<SignInCardProps> = ({
  defaultEmail,
  onLoggedIn,
  onRequireFirstLoginOtp,
  onSwitchToCreateAccount,
  onForgotPassword,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: defaultEmail || "",
      password: "",
      client: "career",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const res: SignInResponse = await authService.signIn(values);

      if (res.numberOfLogin === 0) {
        // First login with one-time password:
        // backend should send OTP email in this step
        onRequireFirstLoginOtp({
          email: res.email,
          token: res.token,
        });
        return;
      }

      // if (!res.token || !res.firstName) {
      //   throw new Error("Missing token or user in response");
      // }

      // Normal login flow → go home
      onLoggedIn({
        token: res.token,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
      });
    } catch (err: any) {
      setError("root", {
        type: "server",
        message: err?.message || "Unable to sign in",
      });
    }
  };

  return (
    <>
      <GoogleAuthButton />
      {/* <button
        type="button"
        className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold">
          <FaGoogle size={20} color="#00253C" />
        </span>
        <span>Continue with Google</span>
      </button> */}

      <div className="flex items-center gap-4 my-4">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
          or
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
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
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-primary-900">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-gray-300 text-[#054E72] focus:ring-[#054E72]"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-primary-1 hover:underline"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        {errors.root && (
          <p className="text-xs text-red-500 mt-1">{errors.root.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-md bg-[#054E72] py-3 text-sm font-semibold text-white hover:bg-[#043a56] transition disabled:opacity-70"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-black">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToCreateAccount}
          className="font-semibold text-[#054E72] hover:underline"
        >
          Create one
        </button>
      </p>
    </>
  );
};

export default SignInCard;
