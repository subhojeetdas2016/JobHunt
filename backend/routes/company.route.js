import express from "express";
import Authenticated from "../middlewares/Authenticated.js";
import { getCompany, getCompanybyId, registerCompany, updateCompany } from "../controllers/company.controller.js";
// import { login } from '../controller/user.controller.js';
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();

//routs for if Authenticated so register/get/getById/UpdateId
router.route("/register").post(Authenticated, registerCompany);
router.route("/get").get(Authenticated, getCompany);
router.route("/get/:id").get(Authenticated, getCompanybyId);
router.route("/update/:id").put(Authenticated,singleUpload, updateCompany);
export default router;