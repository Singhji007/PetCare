import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

// Convert __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Path to data files
const dataPath = path.join(__dirname, "data");

// Helper function to read data from JSON files
const readData = (file) => {
  const filePath = path.join(dataPath, file);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Helper function to write data to JSON files
const writeData = (file, data) => {
  const filePath = path.join(dataPath, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Import routes
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";

// Use routes
app.use("/api/users", userRoutes(readData, writeData));
app.use("/api/services", serviceRoutes(readData, writeData));
app.use("/api/contact", contactRoutes(readData, writeData));
app.use("/api/pricing", pricingRoutes(readData, writeData));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
