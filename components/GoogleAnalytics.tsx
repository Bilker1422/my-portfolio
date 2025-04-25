import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

export default function GoogleAnalytics() {
  // Only render scripts if GA ID is available
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Global Site Tag - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
