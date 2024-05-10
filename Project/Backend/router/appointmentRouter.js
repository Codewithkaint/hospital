import express from "express"
import { getAllAppointments, postAppointment, updateAppointmentStatus, deleteAppointment } from "../controller/appointController.js";
import { isAdminAuthenticaed, isPatientAuthenticaed } from "../middlewares/auth.js";
const router=express.Router();
router.post("/post",isPatientAuthenticaed,postAppointment);
// router.get("/getAll",isAdminAuthenticaed,getAllAppointments);
router.get("/getAll",getAllAppointments);
router.put("/update/:id",isAdminAuthenticaed,updateAppointmentStatus);
router.delete("/delete/:id",isAdminAuthenticaed,deleteAppointment);

export default router;