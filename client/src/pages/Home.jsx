import HeroSection from "../components/home/HeroSection";
import FeatureCards from "../components/home/FeatureCards";
import HowItWorks from "../components/home/HowItWorks";
import ItemsSection from "../components/home/ItemsSection";
import SuccessStories from "../components/home/SuccessStories";
import CTASection from "../components/home/CTASection";
import { recentlyFoundItems, recentlyLostItems } from "../data/landingData";

function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeatureCards />
      <HowItWorks />

      <ItemsSection
        title="Recently Found"
        subtitle="Check if someone found your missing item today"
        items={recentlyFoundItems}
      />

      <ItemsSection
        title="Recently Lost"
        subtitle="Help our community members recover their items"
        items={recentlyLostItems}
      />

      <SuccessStories />
      <CTASection />
    </div>
  );
}

export default Home;
