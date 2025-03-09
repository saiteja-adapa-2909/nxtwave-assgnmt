import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContact, addContact, updateContact } from "./api";

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (id) {
      getContact(id).then((res) => setContact(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    id ? await updateContact(id, contact) : await addContact(contact);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        required
      />
      <button type="submit">{id ? "Update" : "Add"} Contact</button>
    </form>
  );
};

export default ContactForm;
