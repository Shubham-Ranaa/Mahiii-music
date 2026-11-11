import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { ListenTogether } from "@/components/sections/ListenTogether";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { DesignPhilosophy } from "@/components/sections/DesignPhilosophy";
import { Creator } from "@/components/sections/Creator";
import { Roadmap } from "@/components/sections/Roadmap";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <ListenTogether />
      <AppShowcase />
      <DesignPhilosophy />
      <Creator />
      <Roadmap />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
