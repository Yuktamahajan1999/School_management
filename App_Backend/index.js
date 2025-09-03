import express from "express";
import cors from "cors";
import schoolRoutes from "./Routes/SchoolRoute.js";
import path from "path";
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/schools", schoolRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
