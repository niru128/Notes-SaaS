import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose, { connect } from "mongoose"
import noteRoutes from "./routes/noteRoutes.js"
import tenantRoutes from "./routes/tenantRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();




const allowedOrigins = ['https://notes-saa-s-tufx.vercel.app'];

app.use(cors({
  origin: function(origin, callback){
   
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true 
}));

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