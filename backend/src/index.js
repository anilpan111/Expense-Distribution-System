import connectDb from "./db/dbConnection.js";
import { app } from "./app.js";
import dotenv from "dotenv"
import {createServer} from 'http'
import {Server} from 'socket.io'
dotenv.config()

// const PORT=process.env.PORT || 8000

connectDb().then( ()=>{

    const server = createServer(app);

    const io = new Server(server,{
        cors:{
            origin: process.env.CORS_ORIGIN || 8000,
            credentials: true
        }
    });

    io.on("connection",(socket)=>{
        console.log("User connected with id:",socket.id)
    })



    server.listen(process.env.PORT || 8000 , ()=>{
        console.log("Server is running at PORT",process.env.PORT);
    })
    server.on("error", (error)=>{
        console.log("Failed to start express server",error)
    })
    // app.get("/",(req,res)=>{
    //     res.send("Hello from home page")
    // })
}).catch((error)=>{
    console.log("FAILED MONGO DB CONNECTION",error);
    process.exit(1)
})