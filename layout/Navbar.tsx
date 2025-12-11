"use client";

import { usePathname, useRouter } from "next/navigation";
import logo from "../public/icons/logo.webp";
import Image from "next/image";
import {
  ArrowSquareOutIcon,
  CaretDownIcon,
  CaretUpIcon,
  ListIcon,
  XIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

const NavbarWrapper = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { firstName, lastName, clearAuth, token } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const whiteBackgroundPages = ["/", "/jobs", "/talent-community"];
  const hasWhiteBackground = whiteBackgroundPages.includes(pathname);

  const backgroundColor = hasWhiteBackground
    ? "bg-transparent"
    : "bg-primary-1";
  const textColor = hasWhiteBackground ? "text-white" : "text-white";
  const positionNavbar = hasWhiteBackground
    ? "absolute top-0 left-0 right-0"
    : "relative";

  const AuthLinks = () =>
    !token ? (
      <li className="flex justify-center items-center gap-1">
        <Link
          className="flex justify-center items-center gap-1 transition hover:text-[#C2B48B]"
          href="/register"
          onClick={() => {
            setMenuOpen(false);
            setMobileOpen(false);
          }}
        >
          <UserCircleIcon size={18} />
          Log in
        </Link>
        <span className="text-white">|</span>
        <Link
          className="transition hover:text-[#C2B48B]"
          href="/register"
          onClick={() => {
            setMenuOpen(false);
            setMobileOpen(false);
          }}
        >
          Sign up
        </Link>
      </li>
    ) : (
      <li className="relative flex justify-center items-center gap-2">
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex items-center gap-1 transition hover:text-[#C2B48B]"
        >
          <UserCircleIcon size={18} /> {firstName || "Profile"} {lastName || ""}{" "}
          {menuOpen ? <CaretUpIcon size={18} /> : <CaretDownIcon size={18} />}
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-44 rounded-md bg-primary-1 text-white shadow-lg p-3 space-y-2">
            <Link
              href="/profile"
              className="block text-sm hover:text-[#C2B48B]"
              onClick={() => setMenuOpen(false)}
            >
              My profile
            </Link>
            <button
              className="block text-left w-full text-sm hover:text-[#C2B48B]"
              onClick={() => {
                sessionStorage.removeItem("auth-storage");
                clearAuth();
                setMenuOpen(false);
                setMobileOpen(false);
                router.push("/");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </li>
    );

  return (
    <div className={`${positionNavbar} ${backgroundColor} ${textColor} w-full z-99 `}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:text-[#C2B48B]"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
            </button>
            <Link className="" href="/" onClick={() => setMobileOpen(false)}>
              <div className="cursor-pointer">
                <Image src={logo} alt="Fly Cham" width={130} height={20} />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-12">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="transition hover:text-[#C2B48B]" href="/">
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition hover:text-[#C2B48B]"
                    href="/jobs"
                  >
                    {" "}
                    Jobs{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition hover:text-[#C2B48B]"
                    href="/talent-community"
                  >
                    {" "}
                    Talent Community{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="flex gap-1 justify-between items-center transition hover:text-[#C2B48B]"
                    href="https://flycham.com"
                    target="_blank"
                  >
                    {" "}
                    About Fly Cham <ArrowSquareOutIcon size={18} />
                  </Link>
                </li>

                <AuthLinks />
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden rounded-md bg-primary-1 text-white shadow-lg p-4 space-y-3">
            <Link
              href="/"
              className="block text-sm hover:text-[#C2B48B]"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="block text-sm hover:text-[#C2B48B]"
              onClick={() => setMobileOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/talent-community"
              className="block text-sm hover:text-[#C2B48B]"
              onClick={() => setMobileOpen(false)}
            >
              Talent Community
            </Link>
            <Link
              href="https://flycham.com"
              target="_blank"
              className="block text-sm hover:text-[#C2B48B]"
              onClick={() => setMobileOpen(false)}
            >
              About Fly Cham
            </Link>
            <div className="border-t border-white/20 pt-3">
              <AuthLinks />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarWrapper;
