import { FaLocationArrow } from "react-icons/fa6";
import { Button, Highlight } from "../button";
import { Hero, HeroTitle, HeroSubtitle } from "../hero copy";
import { HeroImage } from "../hero-image";
import { ChevronIcon } from "../icons/chevron";
import MagicButton from "@/components/MagicButton";

export const HomepageHero = () => (
  <Hero>
    <Button
      className="translate-y-[-1rem] animate-fade-in opacity-0"
      href="/"
      variant="secondary"
      size="small"
    >
      <span>StudySphere 2024 Release</span> <Highlight>→</Highlight>
    </Button>
    <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      Smarter learning 
       <br className="hidden md:block" />{" "}
      With AI-driven collaboration
    </HeroTitle>
    <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
      Set the new standard for collaborative learning.
      <br className="hidden md:block" /> Streamline tasks, teamwork, and
      learning goals.
    </HeroSubtitle>

    <a href="/dashboard">
      <MagicButton title="Get Started " icon="" position="right" />
    </a>
    <HeroImage />
  </Hero>
);
