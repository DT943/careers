"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import {
  jobsList,
  jobTeams,
  jobLocations,
  jobExperienceLevels,
} from "../Helper/JobsData";
import JobCard from "./JobCard";
import FilterSelect from "./FilterSelect";

const JobResultsSection = () => {
  const [mode, setMode] = useState("job-search");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All teams");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedExperience, setSelectedExperience] = useState(
    "All experience levels"
  );

  const filteredJobs = useMemo(() => {
    return jobsList.filter((job) => {
      const matchesSearch =
        searchTerm.trim().length === 0 ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTeam =
        selectedTeam === "All teams" || job.team === selectedTeam;

      const matchesLocation =
        selectedLocation === "All locations" ||
        job.location === selectedLocation;

      const matchesExperience =
        selectedExperience === "All experience levels" ||
        job.experienceLevel === selectedExperience;

      return (
        matchesSearch && matchesTeam && matchesLocation && matchesExperience
      );
    });
  }, [searchTerm, selectedTeam, selectedLocation, selectedExperience]);

  return (
    <section className="bg-[#F5F7FA] py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-primary-1 shadow-sm overflow-hidden p-3">
            <button
              type="button"
              onClick={() => setMode("job-search")}
              className={`px-8 py-2 text-sm font-medium rounded-lg ${
                mode === "job-search"
                  ? "bg-white text-primary-1"
                  : "  bg-primary-1 text-white"
              }`}
            >
              Job Search
            </button>
            <button
              type="button"
              onClick={() => setMode("job-matching")}
              className={`px-8 py-2 text-sm font-medium rounded-lg ${
                mode === "job-matching"
                  ? "bg-white text-primary-1"
                  : "  bg-primary-1 text-white"
              }`}
            >
              Job Matching
            </button>
          </div>
        </div> */}

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
                  placeholder="Search jobs..."
                  className="w-full rounded-md border border-gray-100 bg-[#F5F5F4] py-2 pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-primary-1 focus:bg-white focus:ring-1 focus:ring-primary-1"
                />
              </div>
            </div>

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
          </div>
        </div>

        <p className="mb-3 p-2 text-sm text-gray-500">
          {filteredJobs.length} Result
          {filteredJobs.length !== 1 ? "s" : ""}
        </p>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobResultsSection;
