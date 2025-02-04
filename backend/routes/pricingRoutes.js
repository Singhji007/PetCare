module.exports = (readData, writeData) => {
    const express = require("express");
    const router = express.Router();
  
    // Add a new pricing plan
    router.post("/", (req, res) => {
      const { name, price, features } = req.body;
      const pricingPlans = readData("pricing.json");
  
      // Add new pricing plan
      const newPricing = { id: Date.now(), name, price, features };
      pricingPlans.push(newPricing);
      writeData("pricing.json", pricingPlans);
  
      res.status(201).json({ message: "Pricing plan added successfully", pricing: newPricing });
    });
  
    // Get all pricing plans
    router.get("/", (req, res) => {
      const pricingPlans = readData("pricing.json");
      res.status(200).json(pricingPlans);
    });
  
    return router;
  };