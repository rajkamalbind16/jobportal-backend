import  express from "express";
import  {registerController ,loginController }  from "../controller/authController.js";


//object routes
const router = express.Router()

//routes
// register || post
router.post('/register',registerController);

//login || post
router.post('/login',loginController);

export default router
