import React, { useState,useContext } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
    const { show, setShow } = useState(false);
    const { isAuthenticated, setAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const gotoHomePage = () => {
        navigateTo("/");
        // setShow(!show);
    };
    const gotoDoctorsPage = () => {
        navigateTo("/doctors");
        // setShow(!show);
    };
    const gotoMessagesPage = () => {
        navigateTo("/messages");
        // setShow(!show);
    };
    const gotoAddNewDoctor = () => {
        navigateTo("/doctor/addnew");
        // setShow(!show);
    };
    const gotoAddNewAdmin = () => {
        navigateTo("/admin/addnew");
        // setShow(!show);
    };

    const handleLogout = async () => {
        await axios
            .get("http://localhost:4000/api/v1/user/admin/logout", {
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res.data.message);
                setAuthenticated(false);
            })
            .catch((err) => {
                toast.error("message Failed");
            });
    };
    return (
        <>
         <nav style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}>

            <div className="links">
                <TiHome onClick={gotoHomePage} />
                <FaUserDoctor onClick={gotoDoctorsPage} />
                <MdAddModerator onClick={gotoAddNewAdmin} />
                <IoPersonAddSharp onClick={gotoAddNewDoctor} />
                <AiFillMessage onClick={gotoMessagesPage} />
                <RiLogoutBoxFill onClick={handleLogout} />
            </div>


        </nav>
        <div style={!isAuthenticated?{display:"none"}:{display:"flex"}} className="wrapper">
            <GiHamburgerMenu className="hamburger" onClick={()=>setShow(!show)}></GiHamburgerMenu>
        </div>
        </>
    )
}
export default Sidebar;