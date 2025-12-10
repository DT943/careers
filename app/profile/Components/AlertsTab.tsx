"use client";

import JobAlertCard from "./JobAlert";

type Alert = {
  id: number;
  title: string;
  keywords: string;
  workingTime: string;
  jobLevel: string;
  location: string;
  jobCategory: string;
  alertFrequency: string;
  isActive: boolean;
};

type AlertsTabProps = {
  alerts: Alert[];
  loading?: boolean;
  error?: boolean;
  showSkeleton?: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const AlertsTab = ({ alerts, loading, error, showSkeleton, onToggle, onDelete }: AlertsTabProps) => {
  if (loading || showSkeleton) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <AlertSkeleton />
        <AlertSkeleton />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">Failed to load alerts.</p>;
  }

  if (!alerts.length) {
    return <p className="text-sm text-primary-900">No alerts found.</p>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {alerts.map((alert) => (
        <JobAlertCard
          key={alert.id}
          alert={alert}
          onToggle={() => onToggle(alert.id)}
          onDelete={() => onDelete(alert.id)}
        />
      ))}
    </div>
  );
};

const AlertSkeleton = () => (
  <div className="h-24 w-full rounded-2xl border border-gray-200 bg-gray-100 animate-pulse" />
);

export default AlertsTab;

