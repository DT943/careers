"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAccountSchema,
  CreateAccountFormValues,
} from "@/validations/createAccountSchema";
import { authService } from "@/services/Auth";
import GoogleAuthButton from "./GoogleAuthButton";

type CreateAccountCardProps = {
  onAccountCreated: (email: string) => void;
  onBackToSignIn: () => void;
};

const CreateAccountCard: React.FC<CreateAccountCardProps> = ({
  onAccountCreated,
  onBackToSignIn,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      client: "career",
    },
  });

  const onSubmit = async (values: CreateAccountFormValues) => {
    try {
      await authService.createAccount(values);

      // BE should send first password to email
      onAccountCreated(values.email);
    } catch (err: any) {
      setError("root", {
        type: "server",
        message: err?.message || "Unable to create account",
      });
    }
  };

  return (
    <>
      <GoogleAuthButton />
      <div className="flex items-center gap-4 my-4">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
          or
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 w-full">
          <div className="space-y-1 w-1/2">
            <label className="block text-sm font-normal text-primary-900">
              First Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-1 focus:ring-[#054E72] focus:border-[#054E72]"
              placeholder="Enter your first name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1 w-1/2">
            <label className="block text-sm font-normal text-primary-900">
              Last Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-1 focus:ring-[#054E72] focus:border-[#054E72]"
              placeholder="Enter your last name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-black">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onBackToSignIn}
          className="font-semibold text-[#054E72] hover:underline"
        >
          Sign in
        </button>
      </p>
    </>
  );
};

export default CreateAccountCard;
