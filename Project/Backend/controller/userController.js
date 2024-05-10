import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, role, dob } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !role || !dob) {
        return next(new ErrorHandler("Please Fill Form", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("Email exist", 400));
    }
    user = await User.create({ firstName, lastName, email, phone, password, gender, role, dob })
    generateToken(user,'User Registered',200,res);
   
})



export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler('Please Provide all Details', 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler('Pasword and Confirm Password not match', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid email or invalid password', 400))
    }

    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Password'), 400)
    }
    if (role !== user.role) {
        return next(new ErrorHandler('User with this role is not found'), 400)
    }
    generateToken(user,'User Logged In successfully',200,res);
   
    


})


export const adminRegister=catchAsyncError(async(req,res,next)=>{
    const { firstName, lastName, email, phone, password, gender, dob } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob) {
        return next(new ErrorHandler("Please Fill Form", 400));
    }
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this already Exist`,400))
    }
    const admin=await User.create({firstName, lastName, email, phone, password, gender, dob,role:"Admin"});
    res.status(200).json({
        success:true,
        message:"New Admin Registered"
    })
})


export const getAllDoctors=catchAsyncError(async(req,res,next)=>{
    const doctor=await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctor
    })
})




export const getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    });
});





export const logoutAdmin = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()), // Corrected "Data" to "Date"
    }).json({
        success: true,
        message: "Admin logged out Successfully", // Corrected "log out" to "logged out"
    });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()), // Corrected "Data" to "Date"
    }).json({
        success: true,
        message: "Patient logged out Successfully", // Corrected "log out" to "logged out"
    });
});


export const newDoctor=catchAsyncError(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor avtar is missing",400));
    }
    const {docAvatar}=req.files;
    console.log(docAvatar)
    const allowedFormats=["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not Supported",400));
    }
    
    const { firstName, lastName, email, phone, password, gender, role, dob,doctorDepartment} = req.body;
    
    if (!firstName || !lastName || !email || !phone || !password || !gender || !role || !dob || !doctorDepartment) {
       

        return next(new ErrorHandler("Please Fill Form", 400));
    }
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already exist`, 400));
    }
    
    const cloudsResponse=await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    )
    if(!cloudsResponse || cloudsResponse.error){
        console.log("Error")
    }
    const doctor=await User.create({firstName, lastName, email, phone, password,doctorDepartment, gender, dob,role:"Doctor",docAvatar:{
        public_id:cloudsResponse.public_id,
        url: cloudsResponse.secure_url,
    }});
    
  
    
    res.status(200).json({
        success:true,
        message:"New Doctot Register",
        doctor

    })
})
