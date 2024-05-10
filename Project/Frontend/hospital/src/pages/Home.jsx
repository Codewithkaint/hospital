import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Department from "../components/Department"
import MessageForm from "../components/MessageForm"
import { Context } from "../main";
import Footer from "../components/Footer";
const Home = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  

    return (
        <>
            <Hero title={"Welcome to Apne Medical Institute"} img={'/hero.png'} />
            <Biography img={"/about.png"} />
            <Department />
            <MessageForm />
            <Footer />
        </>
    )
};
export default Home;