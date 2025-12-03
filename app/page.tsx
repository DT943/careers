import CareersClient from "./careers/CareersClient";

export const metadata = {
  title: "Fly Cham - Careers",
  description:
    "Book flights across the world and discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.",
  icons: {
    icon: [
      { url: "../public/favicon.ico?v=1", sizes: "48x48" },
      {
        url: "../public/favicon-16x16.png?v=1",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "../public/favicon-32x32.png?v=1",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "../public/favicon-48x48.png?v=1",
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: "../public/favicon-64x64.png?v=1",
        type: "image/png",
        sizes: "64x64",
      },
      {
        url: "../public/favicon-128x128.png?v=1",
        type: "image/png",
        sizes: "128x128",
      },
      {
        url: "../public/favicon-256x256.png?v=1",
        type: "image/png",
        sizes: "256x256",
      },
      { url: "../public/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "../public/apple-touch-icon.png?v=1", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0B4572" },
    ],
  },
  openGraph: {
    title: "Fly Cham - Careers",
    description:
      "Book flights across the world and discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.",
    url: "https://flycham.com",
    siteName: "Fly Cham",
    images: [
      {
        url: "https://flycham.com/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Fly Cham Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly Cham - Careers",
    description:
      "Book flights across the world and discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.",
    images: ["https://flycham.com/logo.jpg"],
  },
};

const HomePage = () => {
  return <CareersClient />;
};

export default HomePage;
