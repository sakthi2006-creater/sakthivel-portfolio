"use client";

import dynamic from "next/dynamic";

export const AINetworkBackground = dynamic(
  () => import("./AINetworkBackground").then((mod) => mod.AINetworkBackground),
  { ssr: false }
);
