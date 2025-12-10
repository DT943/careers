"use client";

import JobApplicationsTable, { JobApplicationRow } from "./TableApplication";

type ApplicationsTabProps = {
  applications: JobApplicationRow[];
  loading?: boolean;
  error?: boolean;
  showSkeleton?: boolean;
};

const ApplicationsTab = ({ applications, loading, error, showSkeleton }: ApplicationsTabProps) => {
  return (
    <JobApplicationsTable
      applications={applications}
      loading={loading || showSkeleton}
      error={error}
    />
  );
};

export default ApplicationsTab;

