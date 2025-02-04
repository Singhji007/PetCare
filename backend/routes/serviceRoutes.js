module.exports = (readData, writeData) => {
    const express = require("express");
    const router = express.Router();
  
    // Add a new service
    router.post("/", (req, res) => {
      const { name, description, price } = req.body;
      const services = readData("services.json");
  
      // Add new service
      const newService = { id: Date.now(), name, description, price };
      services.push(newService);
      writeData("services.json", services);
  
      res.status(201).json({ message: "Service added successfully", service: newService });
    });
  
    // Get all services
    router.get("/", (req, res) => {
      const services = readData("services.json");
      res.status(200).json(services);
    });
  
    return router;
  };