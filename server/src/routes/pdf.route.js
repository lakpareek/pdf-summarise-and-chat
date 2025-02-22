import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import upload from "../middlewares/multer.middleware.js";
//import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import {  uploadPdf, getConversationById } from "../controllers/pdf.controller.js";
const router = express.Router();



router.post("/uploadpdf",protectRoute, upload.single("file"), uploadPdf);
router.get("/:id/getconversation", protectRoute, getConversationById);

export default router;