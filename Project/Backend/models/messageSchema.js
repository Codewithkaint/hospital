import mongoose from "mongoose";

import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name should have minimum 3 length"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"First Name should have minimum 3 length"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide a valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number must constain 10 digit"],
        maxLength:[10,"Phone Number must constain 10 digit"]
    },
    message:{
        type:String,
        required:true,
        
    }

});

export const Message=mongoose.model("Message",messageSchema);