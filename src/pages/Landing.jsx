import React from "react";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Layout from "./Layout";
import Slider from "../components/Slider";


// ok

const Landing = () => {
 
  return (
    <Layout>
      <Hero />
      <div className="bg-[#001e2b] relative z-50 pt-10 pb-5 h-auto">
        <Benefits />
        <Slider />
      </div>
    </Layout>
  );
};

export default Landing;
