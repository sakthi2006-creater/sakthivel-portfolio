import { projects } from "@/data/projects";
import { certifications } from "@/data/certificates";
import { skills } from "@/data/skills";

export type RouteConfig = {
  id: string;
  path: string;
  label: string;
  index: string;
  accent: string;
  getMetadata?: () => { title: string; lines: string[] };
};

export const globalRoutes: RouteConfig[] = [
  { id: "home", path: "/", label: "HOME", index: "01", accent: "#22d3ee" }, // Cyan
  { id: "services", path: "/services", label: "SERVICES", index: "02", accent: "#0ea5e9" }, // Light Blue
  {
    id: "work",
    path: "/work",
    label: "WORK",
    index: "03",
    accent: "#8b5cf6", // Violet
    getMetadata: () => {
      const total = projects.length;
      return {
        title: "PROJECT UNIVERSE",
        lines: [
          `${total} PROJECTS BUILT`,
          `${Math.min(total, 4)} FEATURED`,
        ],
      };
    },
  },
  { id: "about", path: "/about", label: "ABOUT", index: "04", accent: "#6366f1" }, // Indigo
  { id: "experience", path: "/experience", label: "EXPERIENCE", index: "05", accent: "#3b82f6" }, // Blue
  { id: "contact", path: "/contact", label: "CONTACT", index: "06", accent: "#ffffff" }, // White
  
  // Secondary Routes (MORE)
  { id: "research", path: "/research", label: "RESEARCH", index: "07", accent: "#22d3ee" }, // Cyan
  { id: "achievements", path: "/achievements", label: "ACHIEVEMENTS", index: "08", accent: "#f59e0b" }, // Amber
  {
    id: "certificates",
    path: "/certificates",
    label: "CERTIFICATES",
    index: "09",
    accent: "#fbbf24", // Gold
    getMetadata: () => {
      return {
        title: "CREDENTIALS",
        lines: [
          `${certifications.length} CERTIFICATIONS`,
        ],
      };
    },
  },
  {
    id: "skills",
    path: "/skills",
    label: "SKILLS",
    index: "10",
    accent: "#0ea5e9", // Electric Blue
    getMetadata: () => {
      return {
        title: "ENGINEERING DNA",
        lines: skills.map((s) => s.category),
      };
    },
  },
];
