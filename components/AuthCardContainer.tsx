import Image from "next/image";
import TopShape from "../public/images/word.png";
import React from "react";

interface CardProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

const AuthCardContainer: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-sm overflow-hidden m-3 p-3">
      <div className="pointer-events-none select-none absolute -top-10 -right-20 w-[60vh] h-[32vh] scale-80">
        <Image
          src={TopShape}
          alt="Decorative background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="px-6 py-12 sm:px-16 sm:py-16">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#054E72] mb-6">
          {title}
        </h1>
        <div className="text-left text-base font-normal text-primary-900 mb-6">
          {subtitle}
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthCardContainer;
