import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContactComponent = () => {
  const { type, schoolId } = useParams();

  const [contactsData, setContactsData] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/contacts/${type}/${schoolId}`);
        setContactsData(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [type, schoolId]);

  return (
    <div style={{marginTop: '200px'}}>
      <h1>{type}</h1>
      <ul>
        {contactsData.map((contact, index) => (
          <li key={index}>
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactComponent;
