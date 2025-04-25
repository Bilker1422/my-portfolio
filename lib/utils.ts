import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/gtag";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function usePageViewTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = searchParams?.size ? `${pathname}?${searchParams}` : pathname;

      pageview(url);
    }
  }, [pathname, searchParams]);
}

// Helper function to scroll to a section, accounting for fixed header
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    // Calculate offset considering potential fixed header height
    const headerOffset = 80; // Adjust this value based on your actual header height
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
