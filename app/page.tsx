import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Nav from "@/components/sections/Nav";
import Offres from "@/components/sections/Offres";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Offres />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
