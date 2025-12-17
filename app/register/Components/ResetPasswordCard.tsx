"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/validations/resetPasswordSchema";
import { authService } from "@/services/Auth";
import { OtpPurpose, AuthUser } from "@/types/Auth";
import { useAuthStore } from "@/store/useAuthStore";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

type ResetPasswordCardProps = {
  email: string | null;
  purpose: OtpPurpose; // "FIRST_LOGIN" | "RESET_PASSWORD"
  // if purpose === "RESET_PASSWORD", BE can return token + user to auto-login
  onCompleted: (data?: { token: string; user: AuthUser }) => void;
  onBack?: () => void;
};

const ResetPasswordCard: React.FC<ResetPasswordCardProps> = ({
  email,
  purpose,
  onCompleted,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      client: "career",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const flowToken = useAuthStore((state) => state.flowToken);
  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      if (!email) {
        throw new Error("Missing email");
      }

      const res = await authService.resetPassword({
        token: flowToken,
        password: values.password,
        confirmPassword: values.confirmPassword,
        client: "career"
      });

      if (res.token) {
        // e.g. reset from "forgot password" → BE logs user in immediately
        onCompleted({ token: res.token, user: res.user });
      } else {
        // e.g. first-login reset → ask user to sign in manually
        onCompleted(undefined);
      }
    } catch (err: any) {
      setError("root", {
        type: "server",
        message: err?.response?.data?.message || "Unable to reset password",
      });
    }
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Set a new password for <span className="font-semibold">{email}</span>.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="block text-sm font-normal text-primary-900">
            New Password
          </label>
          <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2.5 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
            <input
              type={showPassword ? "text" : "password"}
              className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              placeholder="Enter new password"
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

        <div className="space-y-1">
          <label className="block text-sm font-normal text-primary-900">
            Confirm Password
          </label>
          <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2.5 focus-within:ring-1 focus-within:ring-[#054E72] focus-within:border-[#054E72]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              placeholder="Re-enter new password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-gray-400 hover:text-gray-700 focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
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
          {isSubmitting ? "Updating..." : "Update password"}
        </button>
      </form>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 text-center w-full text-sm text-[#054E72] hover:underline"
        >
          Back
        </button>
      )}
    </>
  );
};

export default ResetPasswordCard;
