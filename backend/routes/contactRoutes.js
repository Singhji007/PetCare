module.exports = (readData, writeData) => {
    const express = require("express");
    const router = express.Router();
  
    // Submit contact form
    router.post("/", (req, res) => {
      const { name, email, phone, message } = req.body;
      const contacts = readData("contact.json");
  
      // Add new contact submission
      const newContact = { id: Date.now(), name, email, phone, message };
      contacts.push(newContact);
      writeData("contact.json", contacts);
  
      res.status(201).json({ message: "Message sent successfully" });
    });
  
    return router;
  };