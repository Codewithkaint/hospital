import React from "react";
import Hero from "../components/Hero"
import Biography from "../components/Biography"
const About=()=>{
    return (

        <>
          <Hero title={"Learn More About Us| Medical Institute"} img={"/about.png"}></Hero>  
          <Biography img={"/who.png"}></Biography>
        </>
    )
}

export default About;