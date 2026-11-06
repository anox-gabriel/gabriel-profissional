import { LangProvider } from "@/lib/i18n";
import CursorGrid from "@/components/CursorGrid";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Sites from "@/components/Sites";
import Creatives from "@/components/Creatives";
import Services from "@/components/Services";
import AIProcess from "@/components/AIProcess";
import About from "@/components/About";
import Contact, { Footer } from "@/components/Contact";

export default function Home() {
  return (
    <LangProvider>
      <CursorGrid />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Sites />
        <Creatives />
        <Services />
        <AIProcess />
        <About />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
