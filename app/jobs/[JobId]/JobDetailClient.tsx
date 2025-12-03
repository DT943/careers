"use client";

import HeaderContent from "./Components/HeaderContent";
import AboutSection from "./Components/AboutSection";
import ResponsibilitySection from "./Components/ResponsibilitySection";
import RequirmentsSection from "./Components/RequirmentsSection";
import OfferSection from "./Components/OfferSection";
import OurTalentSection from "./Components/OurTalentSection";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

const JobDetailClient = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-1 max-w-7xl w-full">
        <div className="py-12">
          {" "}
          <Link href="/jobs">
            <h5 className=" flex gap-1 items-center text-[#00253C] hover:text-[#3A5A6B] text-sm font-medium">
              <ArrowLeftIcon size={18} /> back to all jobs
            </h5>
          </Link>
        </div>
        <HeaderContent />
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_2fr] gap-4 p-6 w-full max-w-7xl">
          <div className="border border-[#D4D4D2]"></div>
          <div></div>
        </div>

        <AboutSection />
        <ResponsibilitySection />
        <RequirmentsSection />
        <OfferSection />
        <OurTalentSection />
      </div>
    </section>
  );
};

export default JobDetailClient;
