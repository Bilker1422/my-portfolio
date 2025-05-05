import type { Metadata } from "next";
import portfolioData from "@/data/portfolio.json"; // Import portfolio data

const { personal } = portfolioData;
const siteUrl = "https://mahdali.dev/"; // Define base URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Portfolio | ${personal.name}`, // Use imported data
  description: personal.summary, // Use imported data (or a shorter version if preferred)
  keywords: [
    "web developer",
    "full-stack developer",
    "React developer",
    "Next.js",
    "portfolio",
    "software engineer",
    personal.name, // Add name to keywords
  ],
  authors: [{ name: personal.name }], // Use imported data
  creator: personal.name, // Use imported data
  publisher: personal.name, // Use imported data
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `Portfolio | ${personal.name}`, // Use imported data
    description: personal.summary, // Use imported data
    siteName: `${personal.name} Portfolio`, // Use imported data
    images: [
      {
        url: "/og-image.png", // Keep relative path for static export
        width: 1200,
        height: 630,
        alt: `${personal.name} - Developer Portfolio`, // Use imported data
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio | ${personal.name}`, // Use imported data
    description: personal.summary, // Use imported data
    images: ["/twitter-image.png"], // Keep relative path
    // Consider adding twitter handle to portfolio.json if desired
    // creator: personal.twitterHandle || "@your_default_handle",
  },
  robots: {
    index: true,
    follow: true,
  },
};
