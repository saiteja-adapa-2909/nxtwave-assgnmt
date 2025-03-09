import axios from "axios";

const API_URL = "http://localhost:5000/contacts";

export const getContacts = () => axios.get(API_URL);
export const getContact = (id) => axios.get(`${API_URL}/${id}`);
export const addContact = (contact) => axios.post(API_URL, contact);
export const updateContact = (id, contact) => axios.put(`${API_URL}/${id}`, contact);
export const deleteContact = (id) => axios.delete(`${API_URL}/${id}`);
