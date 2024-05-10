import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const AppointmentForm = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setdepartment] = useState("");
    const [doctorFirstName, setdoctorFirstName] = useState("");
    const [doctorLastName, setdoctorLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, sethasVisited] = useState("");

    const departmentsArray = [

        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];
    const navigateTo = useNavigate();

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        const fetchDoctors = async () => {
            const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", {
                withCredentials: true,

            });
            setDoctors(data.doctor)
            console.log(data)

        };
        fetchDoctors();
    }, [])

    const handleAppointment = async (e) => {
        e.preventDefault();
        try {
            const hasVis = Boolean(hasVisited);
            const { data } = await axios.post("http://localhost:4000/api/v1/appointment/post",
                { firstName, lastName, email, phone, gender, dob, appointmentDate, doctor_firstName: doctorFirstName, doctor_lastName: doctorLastName, hasVisted: hasVis, address, department }, {

                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                },
            }
            );
            toast.success(data.message);
            // setfirstName("");
            // setlastName("");

            // setEmail(""),
            // setPhone(""),

            // setDob(""),
            // setGender(""),
            // setAppointmentDate(""),
            // setdepartment("");
            // setdoctorFirstName("")
            // setdoctorLastName("");
            // sethasVisited("");

            // setAddress("");
            navigateTo("/");

        }
        catch (err) {
            toast.error(err.response.data.message)
        }
    }
    return (

        <>
            <div className="container form-component appointment-form">
                <h2>Appointment</h2>


                <form onSubmit={handleAppointment}>
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
                            type="date"
                            placeholder="Appointment Date"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                        <select value={department} onChange={(e) => {
                            setdepartment(e.target.value);
                            setdoctorFirstName("");
                            setdoctorLastName("");
                        }}   >
                            {departmentsArray.map((depart, index) => {
                                return (
                                    <option value={depart} key={index}>{depart}</option>
                                )
                            })}

                        </select>

                    </div>
                    <div>
                        {/* <select value={` ${doctorFirstName} ${doctorLastName}`} onChange={(e) => {
                            setdepartment(e.target.value);
                            const { firstName, lastName } = e.target.value.split(" ");
                            setdoctorFirstName(firstName);
                            setdoctorLastName(lastName);
                        }} disabled={!department} >

                            <option value=" ">Select Doctor</option>
                            {
                                doctors.filter((doctor) => doctor.doctorDepartment === department).map((doctor, index) => 
                                  (
                                        <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>{doctor.firstName}{doctor.lastName}</option>
                                    )
                                ))
                            }
                        </select> */}

<select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setdoctorFirstName(firstName);
                setdoctorLastName(lastName);
              }}
              
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
                    </div>
                    <div>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" cols="30" rows="10"></textarea>
                    </div>


                    <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
                        <p style={{ marginBottom: 0 }}>Have You Visited Before?</p>
                        <input type="checkbox" checked={hasVisited} onChange={(e) => sethasVisited(e.target.checked)}
                            style={{ flex: "none", width: "25px" }} />
                    </div>
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">Get Appointment</button>
                    </div>

                </form>
            </div>

        </>
    )
}

export default AppointmentForm;










