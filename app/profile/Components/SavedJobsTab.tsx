"use client";

import JobCard from "../../jobs/Components/JobCard";
import JobCardSkeleton from "../../jobs/Components/JobCardSkeleton";

type SavedJob = {
  id: string | number;
  title: string;
  team: string;
  experienceLevel: string;
  location: string;
  postedAgo: string;
  closingDate: string;
  employmentType: string;
  dep: string;
  level: string;
};

type SavedJobsTabProps = {
  jobs: SavedJob[];
  loading?: boolean;
  error?: boolean;
  showSkeleton?: boolean;
};

const SavedJobsTab = ({ jobs, loading, error, showSkeleton }: SavedJobsTabProps) => {
  if (loading || showSkeleton) {
    return (
      <div className="space-y-4">
        <JobCardSkeleton />
        <JobCardSkeleton />
      </div>
    );
  }

  if (error) return <p className="text-sm text-red-500">Failed to load saved jobs.</p>;
  if (!jobs.length) return <p className="text-sm text-primary-900">No saved jobs yet.</p>;

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default SavedJobsTab;

