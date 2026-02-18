import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import ControlCenter from "@/components/ControlCenter";
import KineticText from "@/components/KineticText";
import ServicePillars from "@/components/ServicePillars";
import IndustryTabs from "@/components/IndustryTabs";
import BookingSection from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
      <ControlCenter />
      <KineticText />
      <ServicePillars />
      <IndustryTabs />
      <BookingSection />
      <FAQ />
      <Footer />
    </main>
  );
}
