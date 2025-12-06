"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa6";
import { authService } from "@/services/Auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

type GoogleAuthButtonProps = {
  label?: string;
};

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  label = "Continue with Google",
}) => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: async (tokenResponse) => {
      try {
        // 1) نجيب بيانات المستخدم من Google
        const userInfo = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          })
          .then((res) => res.data);

        // 2) نرسلها للباك إند /Authentication/social
        const res = await authService.socialLogin({
          provider: "google",
          client: "career",
          email: userInfo.email,
          accessToken: tokenResponse.access_token,
          //idToken: (tokenResponse as any).id_token ?? "",
        });

        if (!res.token || !res.email) {
          throw new Error("Missing token or email from social login");
        }

        // 3) نخزن التوكن + البيانات في Zustand (و sessionStorage)
        setAuth({
          token: res.token,
          email: res.email,
          firstName: res.firstName ?? userInfo.given_name,
          lastName: res.lastName ?? userInfo.family_name,
        });

        router.push("/"); // أو "/jobs" حسب ما تريد
      } catch (error) {
        console.error("Google login failed:", error);
        // هنا ممكن تضيف toast لو تحب
      }
    },
    onError: (err) => {
      console.error("Google login error:", err);
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold">
        <FaGoogle size={20} color="#00253C" />
      </span>
      <span>{label}</span>
    </button>
  );
};

export default GoogleAuthButton;
