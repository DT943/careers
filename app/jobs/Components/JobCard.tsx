import { BriefcaseIcon, ClockIcon, MapPinIcon } from "@phosphor-icons/react";
import Link from "next/link";

interface Job {
  id: any;
  title: any;
  team: any;
  experienceLevel: any;
  location: any;
  postedAgo: any;
  closingDate: any;
  employmentType: any;
  dep: string;
  level: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <article className="rounded-2xl bg-white px-6 py-5 shadow-sm hover:shadow-lg transition">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <h3 className="text-base font-semibold text-primary-1">
              {job?.title}
            </h3>

            <span className="inline-flex items-center rounded-full bg-[#054E72]/10 px-3 py-0.5 text-xs font-medium text-primary-1">
              {job.dep}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#E5E5E3]/70 px-3 py-0.5 text-xs font-medium text-primary-1">
              {job.level}
            </span>
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-4 text-xs text-primary-900">
            <div className="inline-flex items-center gap-2">
              <BriefcaseIcon size={16} />
              <span>{job.employmentType}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <ClockIcon size={16} />
              <span>{job.postedAgo}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <MapPinIcon size={16} />
              <span>{job.location}</span>
            </div>
          </div>

          <p className="pt-6 text-xs text-primary-900">
            ID:{job.id} • Closing date: {job.closingDate}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link href={`/jobs/${job.id}`}>
            <button
              type="button"
              // onClick={() => {
              //   router.push(`/jobs/${job.id}`);
              // }}
              className="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              View Details
            </button>
          </Link>
          <Link href={`/job-application?jobId=${job.id}&title=${encodeURIComponent(job.title)}`}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-primary-1 px-5 py-2 text-xs font-medium text-white hover:opacity-95"
            >
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
