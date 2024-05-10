import axios from "axios";
import React, { useState } from "react";
import { BsJustify } from "react-icons/bs";
import { toast } from "react-toastify";

const MessageForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const handleMessage = async(e) => {
        e.preventDefault();
        console.log("DS")
        try{
            await axios.post(
                "http://localhost:4000/api/v1/message/send",{firstName,lastName,phone,email,message},
                {
                    withCredentials:true,
                    headers:{
                        "Content-Type":"application/json",
                    },
                }
            )
            .then((res)=>{
                toast.success(res.data.message);
                setFirstName("");
                setMessage("");
                setEmail("");
                setPhone("");
                setlastName("")
            })
        }catch(error){
            toast.error("message not send")
        }
    }
    return (
        <div className="container form-component message-form">
            <h2>Send Us A Message</h2>
            <form onSubmit={handleMessage}>
                <div>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="number" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <textarea value={message} placeholder="Message" onChange={(e) => setMessage(e.target.value)} rows="7"></textarea>
                <div style={{ justifyContent: "center", alignItems: "center" }} >
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>

    )
}
export default MessageForm;