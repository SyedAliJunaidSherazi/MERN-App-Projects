import express from "express";
import {
  facultyLogin,
} from "../controller/facultyController.js";

const router = express.Router();

router.post("/login", facultyLogin);


export default router;
