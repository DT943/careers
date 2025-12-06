"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/validations/resetPasswordSchema";
import { authService } from "@/services/Auth";
import { OtpPurpose, AuthUser } from "@/types/Auth";
import { useAuthStore } from "@/store/useAuthStore";

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

  const flowToken = useAuthStore((state) => state.flowToken);
  console.log(errors)
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
        message: err?.message || "Unable to reset password",
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
          <input
            type="password"
            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-1 focus:ring-[#054E72] focus:border-[#054E72]"
            placeholder="Enter new password"
            {...register("password")}
          />
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
          <input
            type="password"
            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-1 focus:ring-[#054E72] focus:border-[#054E72]"
            placeholder="Re-enter new password"
            {...register("confirmPassword")}
          />
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
