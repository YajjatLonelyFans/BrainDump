import express from 'express';
import noteRoutes from "./Routes/noteRoutes.js"
const app = express()

app.use("/notes" , noteRoutes);

app.listen(3000 , ()=>{
    console.log("Running on port 3000")
})