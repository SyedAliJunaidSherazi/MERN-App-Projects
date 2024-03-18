import express from "express";
import {
  studentLogin,} 

  from "../controller/studentController.js";

const router = express.Router();

router.post("/login", studentLogin);

export default router;
