import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(100, "60 s")
})

const rateLimiter = async (req, res, next) => {
    try {
        const ip = req.ip;
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return res.status(429).send("Rate limit exceeded");
        }
        next();
    } catch (error) {
        console.error("Rate limit error:", error);
        res.status(500).send("Internal Server Error");
    }
}

export default rateLimiter;