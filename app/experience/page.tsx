import { ExperienceJourney } from "@/components/sections/ExperienceJourney";
import { LiveSystem } from "@/components/sections/LiveSystem";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-12">
        <LiveSystem />
        <ExperienceJourney />
      </div>
    </main>
  );
}
