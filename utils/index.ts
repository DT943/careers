export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${
      Math.floor(diffDays / 7) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(diffDays / 30)} month${
    Math.floor(diffDays / 30) > 1 ? "s" : ""
  } ago`;
};

export const formatClosingDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
};

export const getEmploymentTypeLabel = (type: number): string => {
  const types: Record<number, string> = {
    0: "Full time",
    1: "Part time",
    2: "Contract",
  };
  return types[type] || "Unknown";
};

export const getLevelLabel = (level: number): string => {
  const levels: Record<number, string> = {
    0: "Internship",
    1: "Senior",
    2: "Mid-level",
    3: "Junior",
    4: "Lead",
  };
  return levels[level] || "Unknown";
};
