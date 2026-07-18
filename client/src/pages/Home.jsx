import { useEffect, useState } from "react";

import HeroSection from "../components/home/HeroSection";
import FeatureCards from "../components/home/FeatureCards";
import HowItWorks from "../components/home/HowItWorks";
import ItemsSection from "../components/home/ItemsSection";
import SuccessStories from "../components/home/SuccessStories";
import CTASection from "../components/home/CTASection";

import { getRecentFoundItems } from "../services/foundItemService.js";
import { getRecentLostItems } from "../services/lostItemService.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const [recentFoundItems, setRecentFoundItems] = useState([]);
  const [recentLostItems, setRecentLostItems] = useState([]);
  
  useEffect(() => {
    const loadItems = async () => {
      try {
        const [foundResponse, lostResponse] =
          await Promise.all([
            getRecentFoundItems(),
            getRecentLostItems(),
          ]);

        setRecentFoundItems(
          foundResponse.foundItems.map((item) => ({
            id: item._id,
            title: item.title,
            image: item.images?.[0] || "",
            location: item.district,
            date: new Date(item.foundDate).toLocaleDateString(),
          }))
        );

        setRecentLostItems(
          lostResponse.lostItems.map((item) => ({
            id: item._id,
            title: item.title,
            image: item.images?.[0] || "",
            location: item.district,
            date: new Date(item.lostDate).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  
  return (
    <div className="bg-white">
      <HeroSection />
      <FeatureCards />
      <HowItWorks />

      <ItemsSection
        title="Recently Found"
        subtitle="Check if someone found your missing item today"
        items={recentFoundItems}
      />

      <ItemsSection
        title="Recently Lost"
        subtitle="Help our community members recover their items"
        items={recentLostItems}
      />

      <SuccessStories />
      <CTASection />
    </div>
  );
}

export default Home;
