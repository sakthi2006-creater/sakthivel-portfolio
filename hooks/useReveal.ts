"use client";
import { useInView as useInViewLib } from "react-intersection-observer";

export function useReveal(threshold = 0.15) {
  return useInViewLib({ threshold, triggerOnce: true });
}
