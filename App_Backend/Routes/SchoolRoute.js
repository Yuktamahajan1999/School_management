import express from "express";
import { addSchool, getSchools } from "../Controllers/SchoolController.js";
import upload from "../Middlewares/Upload.js";
import { schoolValidation } from "../Middlewares/Validation.js";

const schoolRouter = express.Router();

schoolRouter.post("/createSchool",upload.single("image"),schoolValidation,addSchool);
schoolRouter.get("/getSchools", getSchools);

export default schoolRouter;
