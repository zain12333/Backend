import express from "express";
import cors from "cors";
import  'dotenv/config';
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import  connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000  

app.use(cors({
  origin:'*', // NOT '*'
}));

connectDB();

//this is used for   permission of cross origin resource sharing
const allowedOrigins = ['http://localhost:5173']


app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded

app.use(express.json());
app.use(cookieParser());



//zain@123 password of mangodb and username: muhammadzain6787 



//Api Endpoints
app.get('/',(req,res)=> res.send("ApI working is fine"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.listen(port,()=> console.log(`Server started on PORT:${port}`))
