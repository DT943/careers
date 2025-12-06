import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  pendingEmail: string | null;
  flowToken: string | null; // 🔹 token الخاص بفلو OTP/Reset
  setAuth: (payload: {
    token: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  }) => void;
  clearAuth: () => void;
  setPendingEmail: (email: string | null) => void;
  setFlowToken: (token: string | null) => void; // 🔹 setter
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      firstName: null,
      lastName: null,
      pendingEmail: null,
      flowToken: null,

      setAuth: ({ token, email, firstName, lastName }) =>
        set({
          token,
          email,
          firstName: firstName ?? null,
          lastName: lastName ?? null,
        }),

      clearAuth: () =>
        set({
          token: null,
          email: null,
          firstName: null,
          lastName: null,
          pendingEmail: null,
          flowToken: null,
        }),

      setPendingEmail: (pendingEmail) => set({ pendingEmail }),

      setFlowToken: (flowToken) => set({ flowToken }),
    }),
    {
      name: "auth-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => sessionStorage)
          : undefined,
    }
  )
);
