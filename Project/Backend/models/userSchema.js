import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [6, "Minimum 6 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Patient", "Admin", "Doctor"]
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },

});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

export const User = mongoose.model("User", userSchema);