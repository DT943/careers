"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import AuthCardContainer from "@/components/AuthCardContainer";
import SignInCard from "./Components/SignInCard";
import FirstTimeSignInCard from "./Components/FirstTimeSignInCard";
import CreateAccountCard from "./Components/CreateAccountCard";
import ForgotPasswordCard from "./Components/ForgetPasswordCard";
import OtpVerificationCard from "./Components/OtpVerificationCard";
import ResetPasswordCard from "./Components/ResetPasswordCard";
import PasswordResetCompleteCard from "./Components/PasswordResetCompleteCard";

import { OtpPurpose } from "@/types/Auth";
import { useAuthStore } from "@/store/useAuthStore";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type AuthMode =
  | "SIGN_IN"
  | "FIRST_TIME_SIGN_IN"
  | "CREATE_ACCOUNT"
  | "FORGOT_PASSWORD"
  | "OTP_FIRST_LOGIN"
  | "OTP_RESET_PASSWORD"
  | "RESET_FIRST_LOGIN"
  | "RESET_AFTER_FORGOT"
  | "PASSWORD_RESET_COMPLETE";

const AUTH_TEXTS: Record<
  AuthMode,
  { title: string; subtitle?: React.ReactNode }
> = {
  SIGN_IN: {
    title: "Sign In",
    subtitle: (
      <p>Welcome back! Sign in to manage your applications and profile.</p>
    ),
  },
  CREATE_ACCOUNT: {
    title: "Create account",
    subtitle: (
      <div>
        {/* Create your careers account. We&apos;ll send you a one-time password to
        your email to start. */}
        <h3 className="mb-2">
          Before applying, you’ll need to sign in or create a new FlyCham
          Careers account to start.
        </h3>
        <h3 className="mb-2">
          We&apos;ll send you a one-time password to your email to start.
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
      </div>
    ),
  },
  FORGOT_PASSWORD: {
    title: "Reset your password",
    subtitle: (
      <p className="flex justify-center items-center text-center">
        Enter the email associated with your account and we&apos;ll send you a
        verification code.
      </p>
    ),
  },
  OTP_FIRST_LOGIN: {
    title: "Confirm your email",
    subtitle: (
      <p>
        We sent a verification code to your email. Enter it to continue and set
        your own password.
      </p>
    ),
  },
  OTP_RESET_PASSWORD: {
    title: "Verify your code",
    subtitle: (
      <p>
        Enter the verification code we sent to your email to reset password.
      </p>
    ),
  },
  RESET_FIRST_LOGIN: {
    title: "Create your password",
    subtitle: (
      <p>Choose a strong password that you&apos;ll use to sign in next time.</p>
    ),
  },
  RESET_AFTER_FORGOT: {
    title: "Set a new password",
    subtitle: (
      <p>
        Choose a new password and we&apos;ll sign you in once it&apos;s updated.
      </p>
    ),
  },
  FIRST_TIME_SIGN_IN: {
    title: "Sign In",
    subtitle: (
      <p className=" pt-30">Welcome! Please enter the password we sent to your email.</p>
    ),
  },
  PASSWORD_RESET_COMPLETE: {
    title: "password reset complete",
    subtitle: <p className="flex items-center justify-center text-center">Your password has been reset successfully</p>,
  },
};

const RegisterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");

  const [mode, setMode] = useState<AuthMode>(() =>
    modeParam === "create-account" ? "CREATE_ACCOUNT" : "SIGN_IN"
  );

  const pendingEmail = useAuthStore((state) => state.pendingEmail);
  const setPendingEmail = useAuthStore((state) => state.setPendingEmail);
  const setAuth = useAuthStore((state) => state.setAuth);
  const setFlowToken = useAuthStore((state) => state.setFlowToken);
  const { token } = useAuthStore();

  const { title, subtitle } = AUTH_TEXTS[mode];

  // Keep auth mode in sync with `mode` query param for entry from navbar
  useEffect(() => {
    if (mode === "SIGN_IN" || mode === "CREATE_ACCOUNT") {
      const desiredMode: AuthMode =
        modeParam === "create-account" ? "CREATE_ACCOUNT" : "SIGN_IN";
      if (desiredMode !== mode) {
        setMode(desiredMode);
      }
    }
  }, [modeParam, mode]);

  return (
    <div className="min-h-screen flex flex-col py-10">
      <div className="py-2 p-2 flex items-left justify-left lg:items-center lg:justify-center max-w-4xl">
        <Link href="/jobs">
          <h5 className="flex gap-1 items-center text-[#00253C] hover:text-[#3A5A6B] text-sm font-medium">
            <ArrowLeftIcon size={18} /> Back to all jobs
          </h5>
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <AuthCardContainer title={title} subtitle={subtitle}>
          {mode === "SIGN_IN" && (
            <SignInCard
              defaultEmail={pendingEmail}
              onLoggedIn={({ token, email, firstName, lastName }) => {
                setAuth({ token, email, firstName, lastName });
                router.push("/"); // or "/jobs"
              }}
              onRequireFirstLoginOtp={({ email, token }) => {
                setPendingEmail(email);
                setFlowToken(token); // 🔹 هنا نخزن الـ token لفلو OTP/Reset
                setMode("OTP_FIRST_LOGIN");
              }}
              onRequireFirstTimeSignIn={({ email }) => {
                setPendingEmail(email);
                setMode("FIRST_TIME_SIGN_IN");
              }}
              onSwitchToCreateAccount={() => {
                setMode("CREATE_ACCOUNT");
                router.replace("/register?mode=create-account");
              }}
              onForgotPassword={() => setMode("FORGOT_PASSWORD")}
            />
          )}

          {mode === "FIRST_TIME_SIGN_IN" && (
            <FirstTimeSignInCard
              defaultEmail={pendingEmail}
              onLoggedIn={({ token, email, firstName, lastName }) => {
                setAuth({ token, email, firstName, lastName });
                router.push("/");
              }}
              onRequireFirstLoginOtp={({ email, token }) => {
                setPendingEmail(email);
                setFlowToken(token);
                setMode("OTP_FIRST_LOGIN");
              }}
              onSwitchToCreateAccount={() => setMode("CREATE_ACCOUNT")}
              onForgotPassword={() => setMode("FORGOT_PASSWORD")}
            />
          )}

          {mode === "CREATE_ACCOUNT" && (
            <CreateAccountCard
              onAccountCreated={(email) => {
                // Save email so user doesn't re-type it
                setPendingEmail(email);
                // Redirect to first-time sign-in step with email pre-filled
                setMode("FIRST_TIME_SIGN_IN");
              }}
              onBackToSignIn={() => {
                setMode("SIGN_IN");
                router.replace("/register");
              }}
            />
          )}

          {mode === "FORGOT_PASSWORD" && (
            <ForgotPasswordCard
              onEmailSubmitted={({ email, token }) => {
                setPendingEmail(email);
                setFlowToken(token);
                setFlowToken(token);

                setMode("OTP_RESET_PASSWORD");
              }}
              onBackToSignIn={() => setMode("SIGN_IN")}
            />
          )}

          {mode === "OTP_FIRST_LOGIN" && (
            <OtpVerificationCard
              email={pendingEmail}
              purpose={"FIRST_LOGIN" as OtpPurpose}
              onVerified={() => {
                // OTP for first login succeeded → go to password creation
                setMode("RESET_FIRST_LOGIN");
              }}
              onBack={() => {
                // allow going back to sign-in
                setMode("SIGN_IN");
              }}
            />
          )}

          {mode === "OTP_RESET_PASSWORD" && (
            <OtpVerificationCard
              email={pendingEmail}
              purpose={"RESET_PASSWORD" as OtpPurpose}
              onVerified={() => {
                // OTP for password reset succeeded → go to reset
                setMode("RESET_AFTER_FORGOT");
              }}
              onBack={() => {
                setMode("FORGOT_PASSWORD");
              }}
            />
          )}

          {mode === "RESET_FIRST_LOGIN" && (
            <ResetPasswordCard
              email={pendingEmail}
              purpose={"FIRST_LOGIN" as OtpPurpose}
              onCompleted={() => {
                // first-login reset: show success card
                setMode("PASSWORD_RESET_COMPLETE");
              }}
            />
          )}

          {mode === "RESET_AFTER_FORGOT" && (
            <ResetPasswordCard
              email={pendingEmail}
              purpose={"RESET_PASSWORD" as OtpPurpose}
              onCompleted={(data) => {
                console.log(data);
                // if BE returns token + user, we auto-login
                if (data?.token) {
                  setAuth({
                    token: data.token,
                    email: data.user?.email || pendingEmail || "",
                    firstName: data.user?.firstName,
                    lastName: data.user?.lastName,
                  });
                  router.push("/");
                } else {
                  // show success card
                  setMode("PASSWORD_RESET_COMPLETE");
                }
              }}
            />
          )}

          {mode === "PASSWORD_RESET_COMPLETE" && (
            <PasswordResetCompleteCard
              onReturnToSignIn={() => {
                setMode("SIGN_IN");
              }}
            />
          )}
        </AuthCardContainer>
      </div>
    </div>
  );
};

export default RegisterPage;
