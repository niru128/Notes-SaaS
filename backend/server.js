import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose, { connect } from "mongoose"
import noteRoutes from "./routes/noteRoutes.js"
import tenantRoutes from "./routes/tenantRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();


app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tenants", tenantRoutes);


app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(PORT,()=> console.log(`Server is running on PORT ${PORT}`))