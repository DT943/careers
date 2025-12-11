"use client";

import { usePathname, useRouter } from "next/navigation";
import logo from "../public/icons/logo.webp";
import Image from "next/image";
import { ArrowSquareOutIcon, CaretDownIcon, CaretUpIcon, UserCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

const NavbarWrapper = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { firstName, lastName, clearAuth, token } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const whiteBackgroundPages = ["/", "/jobs", "/talent-community"];
  const hasWhiteBackground = whiteBackgroundPages.includes(pathname);

  const backgroundColor = hasWhiteBackground
    ? "bg-transparent"
    : "bg-primary-1";
  const textColor = hasWhiteBackground ? "text-white" : "text-white";
  const positionNavbar = hasWhiteBackground
    ? "absolute top-0 left-0 right-0"
    : "relative";

  return (
    <div
      className={`${positionNavbar} ${backgroundColor} ${textColor} w-full z-99`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="" href="/">
              <div className="cursor-pointer">
                <Image src={logo} alt="Fly Cham" width={130} height={20} />
              </div>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
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

                {!token ? (
                  <li className="flex justify-center items-center gap-1">
                    <Link
                      className="flex justify-center items-center gap-1 transition hover:text-[#C2B48B]"
                      href="/register"
                    >
                      {" "}
                      <UserCircleIcon size={18} />
                      Log in
                    </Link>
                    <span className="text-white">|</span>
                    <Link
                      className="transition hover:text-[#C2B48B]"
                      href="/register"
                    >
                      {" "}
                      Sign up{" "}
                    </Link>
                  </li>
                ) : (
                  <li className="relative flex justify-center items-center gap-2">
                    <button
                      onClick={() => setMenuOpen((p) => !p)}
                      className="flex items-center gap-1 transition hover:text-[#C2B48B]"
                    >
                      <UserCircleIcon size={18} />{" "}
                      {firstName || "Profile"} {lastName || ""}
                      {menuOpen ? <CaretUpIcon size={18} /> : <CaretDownIcon size={18} />}
                      
                    </button>
                    {menuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-44 rounded-md bg-primary-1 text-white shadow-lg p-3 space-y-2">
                        {/* <Link
                          href="/talent-community"
                          className="block text-sm hover:text-[#C2B48B]"
                          onClick={() => setMenuOpen(false)}
                        >
                          Create job alert
                        </Link> */}
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
                            router.push("/");
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarWrapper;
