import React, { useState } from "react";
import ModalCustom from "./WithdrawModal";
import { useWithdrawApplication } from "@/hooks";
import Link from "next/link";

export type JobApplicationRow = {
  id: number;
  jobOfferCode: string;
  position: string;
  status: string;
  location: string;
  team: string;
  applicationDate: string;
};

type JobApplicationsTableProps = {
  applications: JobApplicationRow[];
  loading?: boolean;
  error?: boolean;
};

const JobApplicationsTable: React.FC<JobApplicationsTableProps> = ({
  applications,
  loading = false,
  error = false,
}) => {
  const [openForId, setOpenForId] = useState<number | null>(null);
  const [withdrawnIds, setWithdrawnIds] = useState<Set<number>>(new Set());
  const { mutateAsync: withdrawApplicationApi, isLoading: withdrawing } =
    useWithdrawApplication();

  const withdrawApplication = async (id: number, note: string) => {
    try {
      await withdrawApplicationApi({ jobApplicationId: id, note });
      setWithdrawnIds((prev) => new Set(prev).add(id));
      setOpenForId(null);
    } catch (err) {
      console.error("Failed to withdraw application", err);
    }
  };

  return (
    <div className="">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-primary-900 text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Position
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Team
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Application Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <>
                {[1, 2, 3].map((idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 animate-pulse"
                  >
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                  </tr>
                ))}
              </>
            )}

            {!loading && error && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-sm text-red-500 text-center"
                >
                  Failed to load applications.
                </td>
              </tr>
            )}

            {!loading && !error && applications.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-sm text-primary-900 text-center"
                >
                  No applications found.
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              applications.map((application) => {
                const isWithdrawn =
                  withdrawnIds.has(application.id) ||
                  application.status.toLowerCase() === "withdrawn";
                return (
                  <tr key={application.id} className="border-b border-gray-200">
                    <td className={`px-6 py-4 text-sm ${application.position ? "underline" : ""}`}>
                      <Link href={`/jobs/${application.jobOfferCode}`}>
                        {application.position}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {isWithdrawn ? "Withdrawn" : application.status}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {application.location}
                    </td>
                    <td className="px-6 py-4 text-sm">{application.team}</td>
                    <td className="px-6 py-4 text-sm">
                      {application.applicationDate}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {!isWithdrawn && (
                        <button
                          className="text-alert"
                          onClick={() => setOpenForId(application.id)}
                        >
                          Withdraw application
                        </button>
                      )}
                      <ModalCustom
                        isOpen={openForId === application.id}
                        onCancel={() => setOpenForId(null)}
                        onWithdraw={(note: string) =>
                          withdrawApplication(application.id, note)
                        }
                        loading={withdrawing}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplicationsTable;
