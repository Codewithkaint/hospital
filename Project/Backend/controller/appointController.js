import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, gender, dob, appointmentDate, doctor_firstName, doctor_lastName, hasVisted, address,department } = req.body;

    if (!firstName || !lastName || !email || !phone || !gender ||  !dob || !department || !appointmentDate || !doctor_firstName || !doctor_lastName ||  !address) {


        return next(new ErrorHandler("Please Fill Form", 400));
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    })
    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 404));
    }
    else if (isConflict.length === 2) {
        return next(new ErrorHandler("Doctor Conflict", 404));
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment=await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        gender,
        dob,
        appointmentDate,
        doctor_firstName,
        doctor_lastName,
        hasVisted,
        address,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        department,
        doctorId,
        patientId
    })

    res.status(200).json({
        success: true,
        message: "Appointment done successfully"
    });



});

export const getAllAppointments=catchAsyncError(async(req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        success:true,
        appointments
    })
})


export const updateAppointmentStatus=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next (new ErrorHandler(`Patient not found`,404));
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:'Update Successfully',
        appointment
    })



})


export const deleteAppointment=catchAsyncError(async(req,res,next)=>{
    const { id }=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler('Appointment Not Found',404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment Deleted"
    })
})