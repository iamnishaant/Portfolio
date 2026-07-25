import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Publications } from "@/components/sections/Publications";
import { Achievements } from "@/components/sections/Achievements";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />

      <div data-recruiter-hide>
        <About />
      </div>

      <SectionDivider />
      <Skills />

      <SectionDivider />
      <Projects />

      <div data-recruiter-hide>
        <SectionDivider />
        <Research />
      </div>

      <div data-recruiter-hide>
        <SectionDivider />
        <Publications />
      </div>

      <div data-recruiter-hide>
        <SectionDivider />
        <Achievements />
      </div>

      <SectionDivider />
      <Experience />

      <SectionDivider />
      <Contact />

      <Footer />
    </>
  );
}
