import React, { useState } from "react";
import ModalCustom from "./WithdrawModal";

type JobApplication = {
  id: number;
  position: string;
  status: string;
  location: string;
  team: string;
  applicationDate: string;
};

const initialApplications: JobApplication[] = [
  {
    id: 1,
    position: "Senior Backend Developer",
    status: "Application Received",
    location: "Damascus",
    team: "Digital & technology",
    applicationDate: "26-11-2026",
  },
  {
    id: 2,
    position: "Senior Frontend Developer",
    status: "Withdrawn",
    location: "Damascus",
    team: "Digital & technology",
    applicationDate: "26-11-2026",
  },
];

const JobApplicationsTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [applications, setApplications] =
    useState<JobApplication[]>(initialApplications);

  const withdrawApplication = (id: number) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === id
          ? { ...application, status: "Withdrawn" }
          : application
      )
    );
    console.log(id);
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
            {applications.map((application) => (
              <tr key={application.id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-sm">{application.position}</td>
                <td className="px-6 py-4 text-sm">{application.status}</td>
                <td className="px-6 py-4 text-sm">{application.location}</td>
                <td className="px-6 py-4 text-sm">{application.team}</td>
                <td className="px-6 py-4 text-sm">
                  {application.applicationDate}
                </td>
                <td className="px-6 py-4 text-sm">
                  {application.status !== "Withdrawn" && (
                    <button
                      className="text-alert"
                      onClick={() => setOpen(true)}
                    >
                      Withdraw application
                    </button>
                  )}
                  <ModalCustom
                    isOpen={open}
                    onCancel={() => setOpen(false)}
                    onWithdraw={() => {
                      withdrawApplication(application.id);
                      setOpen(false);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplicationsTable;
