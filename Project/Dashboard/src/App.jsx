import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddnewDoctor from "./components/AddnewDoctor";

import Doctors from "./components/Doctor";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";

import AddnewAdmin from "./components/AddnewAdmin";

import Message from "./components/Message";
import "./App.css";



const App = () => {

  const { isAuthenticated, setAuthenticated, user, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me", 
          { withCredentials: true }
        );
        
        setAuthenticated(true);
        setUser(response.data.user);

      }
      catch (err) {
        setAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);




  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddnewDoctor />} />
          <Route path="/admin/addnew" element={<AddnewAdmin />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/doctors" element={<Doctors />} />

        </Routes>
        <ToastContainer position='top-center' />

      </Router>
    </>
  )
}

export default App;