import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Portfolio | Yahya Mahdali",
  description:
    "Full-stack developer specializing in modern web applications with React, Next.js, and Node.js",
  keywords: [
    "web developer",
    "full-stack developer",
    "React developer",
    "Next.js",
    "portfolio",
    "software engineer",
  ],
  authors: [{ name: "Yahya Mahdali" }],
  creator: "Yahya Mahdali",
  publisher: "Yahya Mahdali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com",
    title: "Professional Portfolio | Yahya Mahdali",
    description: "Full-stack developer specializing in modern web applications",
    siteName: "Yahya Mahdali Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yahya Mahdali - Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Portfolio | Yahya Mahdali",
    description: "Full-stack developer specializing in modern web applications",
    images: ["/twitter-image.png"],
    creator: "@your_twitter_handle",
  },
  robots: {
    index: true,
    follow: true,
  },
};
