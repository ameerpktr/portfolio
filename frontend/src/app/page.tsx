import { AboutSection } from "@/components/sections/about-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MyEdgeSection } from "@/components/sections/my-edge-section";
import { OperationsKnowledgeSection } from "@/components/sections/operations-knowledge-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <OperationsKnowledgeSection />
      <AchievementsSection />
      <EducationSection />
      <MyEdgeSection />
      <ContactSection />
    </main>
  );
}
