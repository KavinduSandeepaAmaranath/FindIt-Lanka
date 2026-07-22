import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import lostItemRoutes from "./routes/lostItemRoutes.js";
import foundItemRoutes from "./routes/foundItemRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userDashboardRoutes from "./routes/userDashboardRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/lost", lostItemRoutes);
app.use("/api/found", foundItemRoutes);
app.use("/api/claim", claimRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", userDashboardRoutes);

export default app;