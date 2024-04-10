import express from "express";
import { updateController } from "../controller/userController.js";
import userAuth from '../middleware/authMiddleware.js'

//oject router
const router =express.Router();

//router
//get uers||get


//update user||put

router.put('/update-user',userAuth,updateController)

export default router