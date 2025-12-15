"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";
import FilterSelect from "./FilterSelect";
import {
  useJobOffers,
  JobOffer,
} from "@/hooks/useJobOffers";
import { getEmploymentTypeLabel, getTimeAgo, formatClosingDate, getLevelLabel } from "@/utils";

// Transform API response to JobCard format
interface TransformedJob {
  id: number;
  title: string;
  team: string;
  experienceLevel: string;
  location: string;
  postedAgo: string;
  closingDate: string;
  employmentType: string;
  dep: string;
  level: string;
}

const transformJobOffer = (job: JobOffer): TransformedJob => ({
  id: job.id,
  title: job.positionTitle,
  team: job.teamName,
  experienceLevel: getLevelLabel(job.level),
  location: `${job.city}, ${job.country}`,
  postedAgo: getTimeAgo(job.availableDate),
  closingDate: formatClosingDate(job.expirationDate),
  employmentType: getEmploymentTypeLabel(job.employmentType),
  dep: job.teamName,
  level: getLevelLabel(job.level),
});

const JobResultsSection = () => {
  const searchParams = useSearchParams();

  // Get initial values from URL params
  const initialSearch = searchParams.get("search") || "";
  const initialCity = searchParams.get("city") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [cityFilter, setCityFilter] = useState(initialCity);
  const [selectedTeam, setSelectedTeam] = useState("All teams");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedExperience, setSelectedExperience] = useState(
    "All experience levels"
  );

  // API params for the hook
  const [apiSearch, setApiSearch] = useState(initialSearch);
  const [apiCity, setApiCity] = useState(initialCity);

  // Fetch jobs using React Query hook
  const { data, isLoading, error, refetch } = useJobOffers({
    search: apiSearch || undefined,
    city: apiCity || undefined,
  });

  const jobs = useMemo(() => {
    if (!data?.result) return [];
    return data.result.map(transformJobOffer);
  }, [data]);

  // Handle manual search
  const handleSearch = () => {
    setApiSearch(searchTerm);
    setApiCity(cityFilter);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesTeam =
        selectedTeam === "All teams" || job.team === selectedTeam;

      const matchesLocation =
        selectedLocation === "All locations" ||
        job.location === selectedLocation;

      const matchesExperience =
        selectedExperience === "All experience levels" ||
        job.experienceLevel === selectedExperience;

      return matchesTeam && matchesLocation && matchesExperience;
    });
  }, [jobs, selectedTeam, selectedLocation, selectedExperience]);

  return (
    <section className="bg-[#F5F7FA] py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex flex-col gap-4 rounded-xl py-5 bg-white p-4 shadow-md sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search jobs..."
                  className="w-full rounded-md border border-gray-100 bg-[#F5F5F4] py-2 pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-primary-1 focus:bg-white focus:ring-1 focus:ring-primary-1"
                />
              </div>
            </div>

            <div className="flex-1">
              <input
                type="text"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by city..."
                className="w-full rounded-md border border-gray-100 bg-[#F5F5F4] py-2 px-3 text-sm text-gray-800 outline-none focus:border-primary-1 focus:bg-white focus:ring-1 focus:ring-primary-1"
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
              className="rounded-md bg-primary-1 px-5 py-2 text-sm font-medium text-white hover:opacity-95 disabled:opacity-50"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center">
            <FilterSelect
              value={selectedTeam}
              onChange={setSelectedTeam}
              options={jobTeams}
            />

            <FilterSelect
              value={selectedLocation}
              onChange={setSelectedLocation}
              options={jobLocations}
            />

            <FilterSelect
              value={selectedExperience}
              onChange={setSelectedExperience}
              options={jobExperienceLevels}
            />
          </div> */}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            Failed to load jobs. Please try again.
          </div>
        )}

        <p className="mb-3 p-2 text-sm text-gray-500">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {filteredJobs.length} Result
              {filteredJobs.length !== 1 ? "s" : ""}
            </>
          )}
        </p>

        <div className="space-y-4">
          {isLoading ? (
            <>
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-500">
                No jobs found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobResultsSection;
