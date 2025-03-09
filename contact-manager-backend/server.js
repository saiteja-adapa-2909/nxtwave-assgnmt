const express = require("express");
const cors = require("cors");
const knex = require("knex")(require("./knexfile").development);

const app = express();
app.use(cors());
app.use(express.json());

// Get All Contacts
app.get("/contacts", async (req, res) => {
  const contacts = await knex("contacts").select("*");
  res.json(contacts);
});

// Get Single Contact
app.get("/contacts/:id", async (req, res) => {
  const contact = await knex("contacts").where({ id: req.params.id }).first();
  contact ? res.json(contact) : res.status(404).json({ error: "Not Found" });
});

// Add New Contact
app.post("/contacts", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ error: "All fields required" });

  try {
    const [id] = await knex("contacts").insert({ name, email, phone });
    res.status(201).json({ id, name, email, phone });
  } catch (error) {
    res.status(400).json({ error: "Email must be unique" });
  }
});

// Update Contact
app.put("/contacts/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await knex("contacts").where({ id: req.params.id }).update({ name, email, phone });
    res.json({ message: "Contact updated" });
  } catch (error) {
    res.status(400).json({ error: "Could not update contact" });
  }
});

// Delete Contact
app.delete("/contacts/:id", async (req, res) => {
  await knex("contacts").where({ id: req.params.id }).del();
  res.json({ message: "Contact deleted" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
