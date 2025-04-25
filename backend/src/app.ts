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

const allowedOrigins = ["https://ddoon-ddoon.web.app", "http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(challengeRoutes);
app.use(goolRouter);
app.use("/auth", kakaoRouter);
app.use("/api", authRouter);

export default app;
