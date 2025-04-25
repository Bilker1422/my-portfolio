import { event } from "@/lib/gtag";

/**
 * Utility hook to track external link clicks
 * @param {string} linkType - Type of link (e.g. 'social', 'resume', 'project')
 * @param {string} destination - Destination of the link (e.g. 'github', 'linkedin')
 * @returns Function to be used as onClick handler
 */
export function useExternalLinkTracking() {
  const trackExternalLink = (linkType: string, destination: string) => {
    event({
      action: "external_link_click",
      category: linkType,
      label: destination,
    });

    // For debugging during development
    if (process.env.NODE_ENV === "development") {
      console.log(`Tracked ${linkType} link click to: ${destination}`);
    }
  };

  return trackExternalLink;
}
