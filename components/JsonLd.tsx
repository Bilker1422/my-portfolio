import React from "react";
import portfolio from "@/data/portfolio.json";

export default function JsonLd() {
  const { personal } = portfolio;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    description: personal.summary,
    email: personal.email,
    telephone: personal.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: personal.location,
    },
    url: "https://mahdali.dev/",
    sameAs: [personal.githubUrl, personal.linkedinUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
