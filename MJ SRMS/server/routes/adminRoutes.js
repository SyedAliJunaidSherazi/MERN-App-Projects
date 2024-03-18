import express from "express";
import auth from "../middleware/auth.js";
import {
  adminLogin,
  addDepartment,
  updatedPassword,
  deleteDepartment,
  addFaculty,
  getFaculty,
  deleteFaculty
  
} from "../controller/adminController.js";
const router = express.Router();
console.log("Routes Page");
router.post("/login", adminLogin);
router.post("/updatepassword", auth, updatedPassword);
router.post("/adddepartment", addDepartment);
router.post("/deletedepartment", deleteDepartment);
router.post("/addfaculty", addFaculty);
router.post("/getfaculty", getFaculty);
router.post("/deletefaculty", deleteFaculty);

export default router;
