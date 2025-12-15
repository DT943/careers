import { Suspense } from "react";
import JobsClient from "./JobsClient";

export const metadata = {
  title: "Jobs - FlyCham",
  description:
    "Discover the story behind FlyCham mission, values, and commitment to delivering a comfortable, safe, and reliable flying experience to destinations across the region.",
  robots: { index: true, follow: true },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-64x64", type: "image/png", sizes: "64x64" },
      { url: "/favicon-128x128", type: "image/png", sizes: "128x128" },
      { url: "/favicon-256x256", type: "image/png", sizes: "256x256" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.png", color: "#0B4572" },
    ],
  },
  openGraph: {
    title: "Jobs - FlyCham",
    description:
      "Discover the story behind FlyCham mission, values, and commitment to delivering a comfortable, safe, and reliable flying experience to destinations across the region.",
    images: [
      {
        url: "https://flycham.com/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Fly Cham OG Cover",
      },
    ],
  },
};
const JobsPage = () => {
  return (
    <Suspense fallback={null}>
      <JobsClient />
    </Suspense>
  );
};

export default JobsPage;
