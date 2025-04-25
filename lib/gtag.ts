declare global {
  interface Window {
    gtag: (
      type: string,
      googleAnalyticsId: string,
      config: Record<string, string | number | undefined>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-311YCV3QGV";

// Log page views
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
