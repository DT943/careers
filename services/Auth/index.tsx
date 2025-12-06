import {
  CreateAccountRequest,
  ForgetPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  VerifyOtpRequest,
  ForgotPasswordResponse,
  SocialLoginRequest,
  SocialLoginResponse,
} from "@/types/Auth";
import axiosInstance from "@/constant";

export const authService = {
  async signIn(payload: SignInRequest) {
    const response = await axiosInstance.post(
      "/auth/Authentication/login",
      payload
    );
    return response.data;
  },

  async createAccount(payload: CreateAccountRequest) {
    const response = await axiosInstance.post(
      "/auth/authentication/register",
      payload
    );
    return response.data;
  },

  async requestPasswordRecovery(payload: ForgetPasswordRequest) {
    const response = await axiosInstance.post(
      "/auth/Authentication/ForgotPassword",
      payload
    );
    return response.data as ForgotPasswordResponse;
  },

  async verifyOtp(payload: VerifyOtpRequest) {
    const response = await axiosInstance.post(
      "/auth/Authentication/LogInWithOTP",
      payload
    );
    return response.data;
  },

  async resetPassword(payload: ResetPasswordRequest) {
    const response = await axiosInstance.post(
      "/auth/Authentication/FirstResetPassword",
      payload
    );
    return response.data;
  },

  async socialLogin(payload: SocialLoginRequest ) {
    const response = await axiosInstance.post(
      "/auth/Authentication/social",
      payload
    );
    return response.data as SocialLoginResponse;
  },
};
