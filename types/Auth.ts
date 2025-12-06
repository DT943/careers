export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  numberOfLogin?: number;
  email: string;
  code?: string;
  firstName?: string;
  lastName?: string;
  managerCode?: null;
  message?: string;
}

export interface CreateAccountRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export interface GenericMessageResponse {
  message: string;
}

export type OtpPurpose = "FIRST_LOGIN" | "RESET_PASSWORD";

export interface VerifyOtpRequest {
  token: string | null;
  email?: string;
  otp: string;
  client: string;
}

export interface ResetPasswordRequest {
  token: string | null;
  password: string;
  confirmPassword: string;
  client: string;
}

export interface ResetPasswordResponse {
  token?: string;
  user?: AuthUser;
}

export interface ForgetPasswordRequest {
  email: string;
  client: string;
}

export interface ForgotPasswordResponse {
  token: string;
  email: string;
  message?: string;
}

export interface SocialLoginRequest {
  provider: "google";
  email: string;
  client: "career";
  accessToken: string;
}


export type SocialLoginResponse = SignInResponse;

