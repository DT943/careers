"use client";

import React from "react";
import NavbarWrapper from "../layout/Navbar";
import FooterWrapper from "../layout/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/constant/Config";
import QueryProvider from "@/providers/QueryProvider";
import useDisableDevtool from "@/lib/useDisableDevtool";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  useDisableDevtool({ enabled: process.env.NODE_ENV === "production" });

  return (
    <QueryProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <NavbarWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </GoogleOAuthProvider>
    </QueryProvider>
  );
};

export default ClientLayout;


