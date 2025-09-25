
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import noteRoutes from "../routes/noteRoutes.js";
import tenantRoutes from "../routes/tenantRoutes.js";
import authRoutes from "../routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tenants", tenantRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));


if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
}


export default app;
