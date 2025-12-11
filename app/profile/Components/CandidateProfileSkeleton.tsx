"use client";

const line = (w: string) => (
  <div className={`h-4 ${w} bg-gray-200 rounded`} />
);

const CandidateProfileSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl rounded-lg py-2 animate-pulse space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
          <div className="h-5 w-40 bg-gray-200 rounded" />
        </div>
        <div className="h-9 w-28 bg-gray-200 rounded" />
      </div>

      {/* Contact info */}
      <div className="grid gap-y-3 gap-x-10 text-sm md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="space-y-1">
            {line("w-24")}
            {line("w-48")}
          </div>
        ))}
      </div>

      {/* Attachments */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="flex justify-between items-center bg-gray-100 rounded p-3">
            <div className="space-y-2">
              {line("w-48")}
              {line("w-32")}
            </div>
            <div className="h-5 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* Work history */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="space-y-1 pl-4">
            {line("w-40")}
            {line("w-56")}
            {line("w-72")}
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
          <div className="h-5 w-40 bg-gray-200 rounded" />
        </div>
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="space-y-1 pl-4">
            {line("w-44")}
            {line("w-40")}
            {line("w-52")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateProfileSkeleton;

