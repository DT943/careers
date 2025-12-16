"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OtpFormValues } from "@/validations/otpSchema";
import { authService } from "@/services/Auth";
import { OtpPurpose } from "@/types/Auth";
import { useAuthStore } from "@/store/useAuthStore";

type OtpVerificationCardProps = {
  email: string | null;
  purpose: OtpPurpose; // "FIRST_LOGIN" | "RESET_PASSWORD"
  onVerified: () => void;
  onBack: () => void;
};

const OtpVerificationCard: React.FC<OtpVerificationCardProps> = ({
  email,
  purpose,
  onVerified,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      client: "career",
    },
  });

  console.log(errors)
  const flowToken = useAuthStore((state) => state.flowToken);
  const onSubmit = async (values: OtpFormValues) => {
    try {
      await authService.verifyOtp({
        otp: values.otp,
        token: flowToken,
        client: "career",
      });

      onVerified();
    } catch (err: any) {
      setError("root", {
        type: "server",
        message: err?.response?.data?.message || "Invalid OTP",
      });
    }
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        We&apos;ve sent a 6-digit verification code to{" "}
        <span className="font-semibold">{email}</span>. Enter it below to
        continue.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="block text-sm font-normal text-primary-900">
            Verification Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            className="w-full tracking-[0.4em] text-center rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#054E72] focus:border-[#054E72]"
            placeholder="••••••"
            {...register("otp")}
          />
          {errors.otp && (
            <p className="text-xs text-red-500 mt-1">{errors.otp.message}</p>
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
          {isSubmitting ? "Verifying..." : "Verify code"}
        </button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-center w-full text-sm text-[#054E72] hover:underline"
      >
        Back
      </button>
    </>
  );
};

export default OtpVerificationCard;
