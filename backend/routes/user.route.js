import express from "express";
import { login, register, updateProfile, logout } from "../controllers/user.controller.js";
import Authenticated from "../middlewares/Authenticated.js";
import { singleUpload } from "../middlewares/multer.js";
// import { login } from '../controller/user.controller.js';


const router = express.Router();


router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(Authenticated,singleUpload, updateProfile);
router.route("/logout").get(logout);
export default router;