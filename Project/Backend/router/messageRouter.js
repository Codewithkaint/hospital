import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthenticaed } from "../middlewares/auth.js";


const router=express.Router();
router.post("/send",sendMessage)
router.get("/getAll",isAdminAuthenticaed,getAllMessages)

export default router;