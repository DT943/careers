"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const protectedRoutes = ["/profile", "/job-application"];
const publicAuthRoutes = ["/register"];

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useAuthStore();

  useEffect(() => {
    // Check if current route is protected
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isPublicAuth = publicAuthRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // Redirect if accessing protected route without token
    if (isProtected && !token) {
      router.push("/");
      return;
    }

    // Redirect if accessing auth route with token
    if (isPublicAuth && token) {
      router.push("/");
      return;
    }
  }, [pathname, token, router]);

  return <>{children}</>;
};

