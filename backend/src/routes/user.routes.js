import { Router } from "express";
import {registerUser,loginUser, getCurrentUser, suggestUsers} from '../controllers/user.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js" 


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount:1
        }
    ]),
    registerUser);
router.route("/login").post(loginUser);

router.route("/getCurrentUser").get(verifyJWT,getCurrentUser);

router.route("/suggestUsers").post(verifyJWT,suggestUsers)






export default router