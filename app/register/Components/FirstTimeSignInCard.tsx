"use client";

import { useState } from "react";
import { EnvelopeSimpleIcon, LockIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormValues } from "@/validations/signInSchema";
import { authService } from "@/services/Auth";
import { SignInResponse } from "@/types/Auth";

type FirstTimeSignInCardProps = {
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

const FirstTimeSignInCard: React.FC<FirstTimeSignInCardProps> = ({
  defaultEmail,
  onLoggedIn,
  onRequireFirstLoginOtp,
  onSwitchToCreateAccount,
  onForgotPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
        message: err?.response?.data?.message || "Unable to sign in",
      });
    }
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-4 ">
        We&apos;ve sent a password to{" "}
        <span className="font-semibold">{defaultEmail}</span>. Enter it below to
        sign in.
      </p>

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
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-400 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
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
    </>
  );
};

export default FirstTimeSignInCard;
