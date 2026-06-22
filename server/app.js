import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import lostItemRoutes from "./routes/lostItemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostItemRoutes);

export default app;