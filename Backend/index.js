import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors"
import { app, server } from "./Socket/Socketio.js";
import path from "path"

dotenv.config({})




const PORT=process.env.PORT||5000;

const __dirname = path.resolve();

console.log(__dirname);

// middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

const corsOption ={
    origin:"http://localhost:5173",
    credentials:true
};

app.use(cors(corsOption))
// Routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/message",messageRoutes)

app.use(express.static(path.join(__dirname,"/Frontend/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"Frontend","frontend","dist","index.html"));
})

server.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at PORT ${PORT}`);
})