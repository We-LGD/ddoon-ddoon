import express from "express";
import cors from "cors";
import { kakaoRouter } from "./router/kakaoRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(kakaoRouter);

export default app;
