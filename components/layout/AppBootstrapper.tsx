"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AppBootstrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    // This runs only once per hard reload (when the React app mounts)
    if (!hasBootstrapped.current) {
      hasBootstrapped.current = true;
      
      // Clear the entered state so the cinematic intro plays again
      sessionStorage.removeItem("portfolio-entered");

      // The user explicitly requested that ANY refresh should redirect back to the home/landing page
      if (pathname !== "/") {
        router.replace("/");
      }
    }
  }, [pathname, router]);

  return null;
}
