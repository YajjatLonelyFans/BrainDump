import express from 'express';
const app = express()
app.get("/" , (req , res)=>{
    res.send("Welcome to BrainDUmp")
})

app.listen(3000 , ()=>{
    console.log("Running on port 3000")
})