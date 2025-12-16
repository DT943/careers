"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/validations/forgotPasswordSchema";
import { authService } from "@/services/Auth";

type ForgotPasswordCardProps = {
  // onEmailSubmitted: (email: string) => void;
  onEmailSubmitted: (payload: { email: string; token: string }) => void;
  onBackToSignIn: () => void;
};

const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({
  onEmailSubmitted,
  onBackToSignIn,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      client: "career",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const res = await authService.requestPasswordRecovery({
        email: values.email,
        client: values.client,
      });
      // BE sends OTP to email
      // onEmailSubmitted(values.email);
      onEmailSubmitted({
        email: res.email,
        token: res.token,
      });
    } catch (err: any) {
      setError("root", {
        type: "server",
        message: err?.response?.data?.message || "Unable to send recovery email",
      });
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="block text-sm font-normal text-primary-900">
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-1 focus:ring-[#054E72] focus:border-[#054E72]"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
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
          {isSubmitting ? "Sending..." : "Send recovery email"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-black">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onBackToSignIn}
          className="font-semibold text-[#054E72] hover:underline"
        >
          Back to sign in
        </button>
      </p>
    </>
  );
};

export default ForgotPasswordCard;
