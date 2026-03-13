import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PipelineDiagram } from "@/components/PipelineDiagram";
import { DashboardShowcase } from "@/components/DashboardShowcase";
import { TestingShowcase } from "@/components/TestingShowcase";
import { AdvancedCapabilities } from "@/components/AdvancedCapabilities";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col w-full">
      <Hero />
      <FeatureGrid />
      <PipelineDiagram />
      <DashboardShowcase />
      <TestingShowcase />
      <AdvancedCapabilities />
    </main>
  );
}
