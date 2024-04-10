import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from "morgan";

import connectDb from "./config/db.js";
import test from './routes/test.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'

// dot coifig

dotenv.config()


// mongodb
connectDb();

 const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan());

// app.get("/",(req,res) =>{
//     res.send('<h1>HI !! khshi</h1>')
// })

app.use('/api/v1/test',test)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)



//error middleware
app.use(errorMiddleware);

const PORT =process.env.PORT

app.listen(PORT,()=>{
    console.log(`"node is running ${PORT} at ${process.env.DEV_MODE}`);
})


