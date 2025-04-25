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
