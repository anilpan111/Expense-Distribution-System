import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllChats, getAllConversations } from "../controllers/conversation.controller.js";

const router = Router();

router.use(verifyJWT)


router.route("/getAllConversations").get(getAllConversations)

// /api/v1/conversation

router.route("/getAllChats").post(getAllChats)

export default router
