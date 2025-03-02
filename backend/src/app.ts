import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { kakaoRouter } from "./router/kakaoRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/auth", kakaoRouter);

export default app;
