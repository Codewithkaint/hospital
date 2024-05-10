import React, { useContext, useEffect } from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Appointment from "./pages/Appointment"
import About from "./pages/About"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import { Context } from "./main";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const App = () => {
  const {isAuthenticated, setIsAuthenticated,setUser}=useContext(Context);
 
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer position='top-center'/>
      
    </>
  )
}

export default App;