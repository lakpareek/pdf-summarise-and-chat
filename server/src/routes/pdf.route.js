import express from "express";
//import protectRoute from "../middleware/protectRoute.js";
//import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { pdfToText, uploadPdf } from "../controllers/pdf.controller.js";
const router = express.Router();


router.post("/pdftotext", pdfToText);
router.post("/uploadpdf", uploadPdf);

export default router;