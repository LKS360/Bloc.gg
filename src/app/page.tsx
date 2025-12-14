import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#0A0C10] text-white">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
