import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
import { connectDB } from "./config/connection.js";

const app = express();
connectDB();

app.use(
  cors({
    origin: "*", // frontend
    credentials: true, // ⭐ required
  }),
);
app.use(express.json());

import allRoutes from "./routes/index.js";
app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("SaaS API running");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
