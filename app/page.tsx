"use client";
import { useEffect } from "react";
import { navItems } from "@/data";
import Grid from "@/components/Grid";
import { Container } from "../components/container";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Spline from "@splinetool/react-spline";
import { HomepageHero } from "@/components/sections/homepage-hero";
import ButtonStack from "@/components/ButtonStack";

const Home = () => {
  useEffect(() => {
    // Embed configuration script
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "5FQc8UqZwB8VtPjlzG4H9",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(configScript);

    // Embed main script
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "5FQc8UqZwB8VtPjlzG4H9");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    // Clean up scripts on unmount
    return () => {
      document.body.removeChild(configScript);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Spline scene="https://prod.spline.design/YJfz95A2fUbds1Fe/scene.splinecode" />

        <div>
          <Container>
            <HomepageHero />
          </Container>
        </div>

        <Grid />
        <Approach />
        <Clients />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
