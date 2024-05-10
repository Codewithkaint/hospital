import React from "react";
import Hero from "../components/Hero.jsx"; 
import AppointmentForm from "../components/AppointmentForm.jsx";




const Appointment=()=>{
    return (

        <>
            <Hero title={"Schedule Your Appointment | Medical Institute"}img={"/signin.png"}></Hero>
            <AppointmentForm></AppointmentForm>  
        </>
    )
}

export default Appointment;