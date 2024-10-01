


import connectDb from "./db/dbConnection.js";
import { app } from "./app.js";
import dotenv from "dotenv"

dotenv.config()


connectDb().then( ()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log("Server is running at PORT",process.env.PORT);
    })
    app.on("error", (error)=>{
        console.log("Failed to start express server",error)
    })
    // app.get("/",(req,res)=>{
    //     res.send("Hello from home page")
    // })
}).catch((error)=>{
    console.log("FAILED MONGO DB CONNECTION",error);
    process.exit(1)
})