import express from 'express';
import { config } from "dotenv";
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config();
const app = express();
const allowedOrigins = ['http://localhost:3000/api/v1/user/login'];
const options = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());
//middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map