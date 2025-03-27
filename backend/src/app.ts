import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { kakaoRouter } from "./router/kakaoRoutes";
import authRouter from "./router/auth";
import challengeRoutes from "./router/challenge";
import goolRouter from "./router/gool";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(challengeRoutes);
app.use(goolRouter);
app.use("/auth", kakaoRouter);
app.use("/api", authRouter);

export default app;
