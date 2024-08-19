"use client";
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
