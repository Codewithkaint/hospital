import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
  
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();
    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/v1/user/patient/register", { firstName, lastName, email, phone, dob, gender, password,role:"Patient" }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                localStorage.setItem('authentication',true);
                toast.success(res.data.message);
                setIsAuthenticated(true);
                navigateTo("/");
                setfirstName("");
                setlastName("");
                setEmail("");
                setPhone("");

                setDob("");
                setGender("");
                setPassword("");
            });
        }catch(err){
            toast.error(err.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }


    return (
        <>
            <div className="container form-component register-form">
                <h2>Sign Up</h2>
                <p>Please Sign Up to Continue</p>

                <form onSubmit={handleRegistration}>
                    <div>
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <input
                            type={"date"}
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <select value={gender} onChange={(e) => { setGender(e.target.value) }}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
                        <p style={{ marginBottom: 0 }}>Already Registered?</p>
                        <Link to={"/signin"} style={{ textDecoration: "none", color: "#271776ca" }}>Login Now
                        </Link>
                    </div>
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">Register</button>
                    </div>

                </form>
            </div>

        </>
    )
}

export default Register;