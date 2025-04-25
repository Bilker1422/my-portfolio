"use client";

import { Suspense } from "react";
import { usePageViewTracking } from "@/lib/utils";

function Tracker() {
  usePageViewTracking();
  return null;
}

export default function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
