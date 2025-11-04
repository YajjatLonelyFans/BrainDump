import express from 'express';
import noteRoutes from "./Routes/noteRoutes.js"
import dotenv from "dotenv"
import mongoose from 'mongoose';
import rateLimiter from './Middleware/rateLimit.js';
import cors from 'cors';
dotenv.config()
const app = express()
app.use(express.json())
app.use(rateLimiter);
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use("/notes" , noteRoutes);



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})  
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});