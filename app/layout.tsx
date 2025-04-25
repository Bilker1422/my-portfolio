import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:dark" suppressHydrationWarning>
      <head>
        {/* Theme script to prevent flash of incorrect theme - must be placed at the top */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getThemePreference() {
                  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                    return localStorage.getItem('theme');
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                
                const theme = getThemePreference();
                
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }

                // Add event listener for system preference changes
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                  if (!localStorage.getItem('theme')) {
                    if (e.matches) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }
                });
              })();
            `,
          }}
        />
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
