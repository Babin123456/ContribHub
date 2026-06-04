import Navbar from "@/components/UI/Navbar";
import Quote from "@/components/UI/Quote"
// import HeroSection from "@/components/HeroSection";
// import TrustedPrograms from "@/components/TrustedPrograms";
// import SearchSection from "@/components/SearchSection";
// import CategoriesSection from "@/components/CategoriesSection";
// import FeaturedPrograms from "@/components/FeaturedPrograms";
// import HowItWorks from "@/components/HowItWorks";
// import ContributorJourney from "@/components/ContributorJourney";
// import StatisticsSection from "@/components/StatisticsSection";
// import Testimonials from "@/components/Testimonials";
// import CommunitySection from "@/components/CommunitySection";
// import FAQSection from "@/components/FAQSection";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-zinc-900 overflow-hidden">

      <Navbar />

      <Quote />

      {/* <TrustedPrograms />

      <SearchSection />

      <CategoriesSection />

      <FeaturedPrograms />

      <HowItWorks />

      <ContributorJourney />

      <StatisticsSection />

      <Testimonials />

      <CommunitySection />

      <FAQSection />

      <Footer /> */}

    </main>
  );
}