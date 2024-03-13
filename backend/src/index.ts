import express, {Request , Response} from "express"
import path from "path"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./Routes/users"
import authRoutes from "./Routes/auth"
import cookieParser from "cookie-parser"



mongoose.connect(process.env.MONGO_URL as string).then(()=>{
    console.log("Connected to MongoDB successfully")
}).catch(error => {console.log(error.message)})

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({ extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)

app.listen(7000 , ()=>{
    console.log("Server is running at port 7000" )
})