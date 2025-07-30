"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();

  // Don't show navigation on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null;
  }

  return <Navigation />;
}
