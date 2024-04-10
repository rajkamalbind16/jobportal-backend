import express from "express"
import { testPostController } from "../controller/testController.js"
import userAuth from "../middleware/authMiddleware.js"
// router object
const router = express.Router() 

//routes
router.post('/tests',userAuth,testPostController);

export default router