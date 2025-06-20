import express from "express";
import { saveStudent, getStudents } from "../controllers/studentController.js";
const studentRouter = express.Router();

studentRouter.post("/", saveStudent);

studentRouter.get("/", getStudents);

export default studentRouter;
