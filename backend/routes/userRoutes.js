export default (readData, writeData) => {
    const express = require("express");
    const router = express.Router();
  
    // Register a new user
    router.post("/register", (req, res) => {
      const { name, email, password } = req.body;
      const users = readData("users.json");
  
      // Check if user already exists
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Add new user
      const newUser = { id: Date.now(), name, email, password };
      users.push(newUser);
      writeData("users.json", users);
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    });
  
    // Login a user
    router.post("/login", (req, res) => {
      const { email, password } = req.body;
      const users = readData("users.json");
  
      // Find user
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    });
  
    return router;
  };