import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContactComponent = () => {
  const { type, childId, schoolId } = useParams();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/contacts/${type}/${childId}/${schoolId}`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [type, childId, schoolId]);

  return (
    <div style={{marginTop: '200px'}}>
      <h1>{type}</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            {/* Render additional contact details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactComponent
