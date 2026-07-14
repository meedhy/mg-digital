import BusinessObjectives from "@/components/sections/BusinessObjectives";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import FloatingNavbar from "@/components/sections/FloatingNavbar";
import Footer from "@/components/sections/Footer";
import HeroExperience from "@/components/sections/HeroExperience";
import LeadQualification from "@/components/sections/LeadQualification";
import OfferBridge from "@/components/sections/OfferBridge";
import OffersExperience from "@/components/sections/OffersExperience";
import ProcessExperience from "@/components/sections/ProcessExperience";
import ProjectIntentProvider from "@/components/providers/ProjectIntentProvider";

export default function Home() {
  return (
    <ProjectIntentProvider>
      <FloatingNavbar />
      <main>
        <HeroExperience />
        <BusinessObjectives />
        <OfferBridge />
        <ExpertiseSection />
        <OffersExperience />
        <ProcessExperience />
        <LeadQualification />
      </main>
      <Footer />
    </ProjectIntentProvider>
  );
}
