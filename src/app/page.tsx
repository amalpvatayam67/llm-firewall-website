import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { DashboardPreview } from "@/components/DashboardPreview";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeatureGrid />
      <DashboardPreview />
    </div>
  );
}
