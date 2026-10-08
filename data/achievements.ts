export type AchievementLevel = "MAJOR" | "SECONDARY";

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  role: string;
  year?: string;
  date?: string;
  icon: string;
  color: string;
  level: AchievementLevel;
  evidenceUrl?: string; // Optional real image URL
}

export const achievements: AchievementData[] = [
  {
    id: "sih-2025",
    title: "Smart India Hackathon",
    description: "Qualified Round 2 (Project: Rainwater Harvesting)",
    role: "Participant / Developer",
    year: "2025",
    icon: "🏆",
    color: "#FFB347",
    level: "MAJOR",
  },
  {
    id: "forge-vista-2026",
    title: "Forge Vista 2026",
    description: "Project Expo (AI-Based Human Health Report Analyzer)",
    role: "Presenter",
    year: "2026",
    date: "11 Feb 2026",
    icon: "🚀",
    color: "#27F7FF",
    level: "MAJOR",
  },
  {
    id: "icside-2026",
    title: "ICSIDE'26",
    description: "International Conference on Smart Intelligence & Data Eng. (ETCC Paper Presentation)",
    role: "Paper Presenter",
    year: "2026",
    date: "10 Apr 2026",
    icon: "🌐",
    color: "#2B7CFF",
    level: "MAJOR",
  },
  {
    id: "nexora-2026",
    title: "Nexora-2K26",
    description: "Project Expo at Kings Engineering College",
    role: "Presenter",
    year: "2026",
    date: "27 Mar 2026",
    icon: "🎯",
    color: "#8B5CFF",
    level: "SECONDARY",
  },
  {
    id: "rotaract-2025",
    title: "District Rotaract Assembly — IGNITE",
    description: "Delegate",
    role: "Delegate",
    year: "2025",
    date: "7 Sep 2025",
    icon: "🤝",
    color: "#FF6B6B",
    level: "SECONDARY",
  },
  {
    id: "my-bharat-2026",
    title: "MY Bharat Budget Quest 2026",
    description: "Online Quiz",
    role: "Participant",
    year: "2026",
    date: "13 Feb 2026",
    icon: "🧠",
    color: "#FFB347",
    level: "SECONDARY",
  },
  {
    id: "asro-club",
    title: "ASRO Club",
    description: "Participation / Design Thinking & Innovation",
    role: "Participant",
    icon: "💡",
    color: "#27F7FF",
    level: "SECONDARY",
  }
];
