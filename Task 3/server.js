// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/tasks", taskRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "TaskFlow API is running" });
});

// Error Middleware
app.use(errorHandler);

// Server Start
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
