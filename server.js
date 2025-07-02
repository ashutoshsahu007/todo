// Import core modules
import express from "express";
import dotenv from "dotenv";

// Import custom modules
import "./db.js"; // Initialize DB connection
import todoRoutes from "./routes/todoRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/todoss", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
