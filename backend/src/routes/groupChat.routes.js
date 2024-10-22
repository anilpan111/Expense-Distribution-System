import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGroup, sendExpenseMessage, sendSimpleMessage } from "../controllers/groupChats.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.use(verifyJWT)

router.route("/sendSimpleMessage").post(sendSimpleMessage)
router.route("/sendExpenseMessage").post(sendExpenseMessage)
router.route("/createGroup").post(
    upload.fields([
        {
            name: "chatIcon",
            maxCount: 1
        }
    ]),
    createGroup)

    
export default router