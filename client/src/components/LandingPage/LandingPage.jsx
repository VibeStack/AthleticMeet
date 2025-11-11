import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import HowToRegister from "./HowToRegister";
import EventsSection from "./EventsSection";
import DevTeamSection from "./DevTeamSection";
import GallerySection from "./GallerySection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-100 bg-slate-950">
      <Navbar />
      <HeroSection />
      <HowToRegister />
      <EventsSection />
      <DevTeamSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
