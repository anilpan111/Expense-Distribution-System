import { Router } from "express";
import {registerUser,loginUser, getCurrentUser} from '../controllers/user.controller.js'
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

router.route("/getCurrentUser").get(verifyJWT,getCurrentUser)

// router.route("/test").get((req, res) => {
//     console.log("hello from anil");
//     res.send("Hello from Anil's test route");
// });

export default router