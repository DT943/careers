"use client";
import React, { useEffect, useState } from "react";

interface BackgroundContainerProps {
  imageUrl?: any;
  className?: string;
  children: React.ReactNode;
  mobileGradient?: boolean;
  desktopGradient?: boolean;
  specialGradient?: boolean;
  careersGradient?: boolean;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  imageUrl,
  className,
  children,
  mobileGradient,
  desktopGradient,
  specialGradient,
  careersGradient,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 bg-cover bg-center transform`}
        style={{ backgroundImage: `url(${imageUrl?.src})` }}
      />

      {mobileGradient && (
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-[#00253C] to-transparent md:hidden" />
      )}

      {desktopGradient && (
        <div
          className={`absolute lg:flex bottom-0 w-[75%] opacity-70 h-full hidden "left-0 bg-linear-to-r from-[#054E72] to-transparent"`}
        />
      )}

      {specialGradient && (
        <div
          className={`absolute bottom-0 left-0 w-full h-full bg-linear-to-b from-[#054E72]/20 to-[#13364B]`}
        />
      )}

      {careersGradient && (
        <div
          className={`absolute bottom-0 left-0 w-full h-full bg-linear-to-b from-[#054E72]/70 to-[#054E72]/0`}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundContainer;
