import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getConvosForSidebar, getMessages, sendMessage } from "../controllers/chat.controller.js";
const router = express.Router();

router.get("/conversations", protectRoute, getConvosForSidebar);
router.get("/:conversation_id", protectRoute, getMessages);
router.post("/send/:conversation_id", protectRoute, sendMessage);

export default router;