import React, { useEffect, useState } from "react";
import { getContacts, deleteContact } from "./api";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await getContacts();
    setContacts(res.data);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    fetchContacts();
  };

  return (
    <Router>
      <div className="container">
        <h1>Contact Manager</h1>
        <Link to="/add">Add Contact</Link>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {contacts.map((contact) => (
                  <div key={contact.id} className="contact">
                    <p>{contact.name} - {contact.email} - {contact.phone}</p>
                    <Link to={`/edit/${contact.id}`}>Edit</Link>
                    <button onClick={() => handleDelete(contact.id)}>Delete</button>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/add" element={<ContactForm />} />
          <Route path="/edit/:id" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
