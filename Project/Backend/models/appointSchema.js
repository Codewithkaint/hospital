import mongoose from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name should have minimum 3 length"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "First Name should have minimum 3 length"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number must constain 10 digit"],
        maxLength: [10, "Phone Number must constain 10 digit"]
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointmentDate:{
        type:String,
        required:true,

    },
    department:{
        type:String,
        required:true
    },
    doctor:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true

        }
    },
    hasVisited:{
        type:Boolean,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    }

});

export const Appointment=mongoose.model("Appointment",appointmentSchema);