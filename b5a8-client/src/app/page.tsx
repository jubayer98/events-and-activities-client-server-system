import CommonLayout from "@/components/layouts/CommonLayout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CurrentEventsSection from "@/components/home/CurrentEventsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <CommonLayout>
      <HeroSection />
      <StatsSection />
      <CurrentEventsSection />
      <CategoriesSection />
      <HowItWorksSection />
      <CTASection />
    </CommonLayout>
  );
}
