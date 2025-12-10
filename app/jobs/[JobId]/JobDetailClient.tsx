"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HeaderContent from "./Components/HeaderContent";
import AboutSection from "./Components/AboutSection";
import ResponsibilitySection from "./Components/ResponsibilitySection";
import RequirmentsSection from "./Components/RequirmentsSection";
import OfferSection from "./Components/OfferSection";
import OurTalentSection from "./Components/OurTalentSection";
import HeaderContentSkeleton from "./Components/HeaderContentSkeleton";
import SectionSkeleton from "./Components/SectionSkeleton";
import { ArrowLeftIcon, MagnifyingGlassIcon, MapPinIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useJobOfferDetail } from "@/hooks";
import {
  formatClosingDate,
  getEmploymentTypeLabel,
  getLevelLabel,
  getTimeAgo,
} from "@/utils";

const JobDetailClient = () => {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.JobId as string | undefined;

  // Search bar state (redirect to /jobs)
  const [searchValue, setSearchValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  const { data, isLoading, error } = useJobOfferDetail(jobId, {
    languageCode: "en",
  });

  const job = data?.result;

  const translations = useMemo(() => {
    if (!job?.jobOfferTranslations?.length) return null;
    const en = job.jobOfferTranslations.find((t) => t.languageCode === "en");
    return en ?? job.jobOfferTranslations[0];
  }, [job]);

  const responsibilities = useMemo(
    () => job?.keyResponsibilityTranslations?.map((r) => r.title) ?? [],
    [job]
  );
  const requirements = useMemo(
    () => job?.requirementTranslations?.map((r) => r.title) ?? [],
    [job]
  );
  const perks = useMemo(
    () => job?.perkTranslations?.map((p) => p.title) ?? [],
    [job]
  );

  const handleSearchJobs = () => {
    const query = new URLSearchParams();
    if (searchValue.trim()) query.set("search", searchValue.trim());
    if (cityValue.trim()) query.set("city", cityValue.trim());
    const qs = query.toString();
    router.push(`/jobs${qs ? `?${qs}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchJobs();
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-1 max-w-7xl w-full">
        <div className="py-12">
          <Link href="/jobs">
            <h5 className=" flex gap-1 items-center text-[#00253C] hover:text-[#3A5A6B] text-sm font-medium">
              <ArrowLeftIcon size={18} /> back to all jobs
            </h5>
          </Link>
        </div>

       

        {isLoading && <HeaderContentSkeleton />}
        {!isLoading && job && (
          <HeaderContent
            title={job.positionTitle}
            postedAgo={getTimeAgo(job.availableDate)}
            code={job.id}
            location={`${translations?.city ?? ""}, ${translations?.country ?? ""}`}
            category={job.teamName}
            jobType={getEmploymentTypeLabel(job.employmentType)}
            level={getLevelLabel(job.level)}
            closingDate={formatClosingDate(job.expirationDate)}
          />
        )}

        {error && (
          <div className="px-6 text-sm text-red-600">
            Failed to load job details.
          </div>
        )}

        {isLoading ? (
          <>
            <SectionSkeleton lines={4} />
            <SectionSkeleton lines={5} />
            <SectionSkeleton lines={5} />
            <SectionSkeleton lines={4} />
          </>
        ) : (
          <>
            <AboutSection aboutText={translations?.about ?? ""} />
            <ResponsibilitySection responsibilities={responsibilities} />
            <RequirmentsSection requirements={requirements} />
            <OfferSection perks={perks} />
          </>
        )}

        <OurTalentSection />
      </div>
    </section>
  );
};

export default JobDetailClient;
