import express from "express";
import { patientRegister,login, adminRegister, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, newDoctor } from "../controller/userController.js";
import { isAdminAuthenticaed, isPatientAuthenticaed } from "../middlewares/auth.js";



const router=express.Router();
router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addNew",isAdminAuthenticaed, adminRegister);


router.get("/doctors",getAllDoctors);
router.get("/admin/me",isAdminAuthenticaed,getUserDetails);
router.get("/patient/me",isPatientAuthenticaed,getUserDetails);
router.get("/admin/logout",isAdminAuthenticaed,logoutAdmin);
router.get("/patient/logout",isPatientAuthenticaed,logoutPatient);
router.post("/doctor/addNew",isAdminAuthenticaed,newDoctor);

export default router;