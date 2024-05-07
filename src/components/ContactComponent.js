// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { fetchContacts } from '../apiService';

// // const ContactComponent = () => {
// //   const { type, schoolId } = useParams();

// //   const [contactsData, setContactsData] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const data = await fetchContacts(type, schoolId);
// //         setContactsData(data);
// //       } catch (error) {
// //         console.error('Error fetching user profile:', error);
// //       }
// //     };

// //     fetchData();
// //   }, [type, schoolId]);

// //   return (
// //     <div style={{marginTop: '200px'}}>
// //       <h1>{type}</h1>
// //       <ul>
// //         {contactsData.map((contact, index) => (
// //           <li key={index}>
// //             <p>Name: {contact.name}</p>
// //             <p>Email: {contact.email}</p>
// //             <p>Phone: {contact.phone}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default ContactComponent;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchContacts } from '../apiService';

// const ContactComponent = () => {
//   const { type, schoolId } = useParams();
//   const [contactsData, setContactsData] = useState([]);
//   const navigate = useNavigate(); // Import useNavigate from react-router-dom

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchContacts(type, schoolId);
//         setContactsData(data);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchData();
//   }, [type, schoolId]);

//   // Function to handle the back button click
//   const handleBack = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <div style={{marginTop: '200px'}}>
//       <h1>{type}</h1>
//       <button onClick={handleBack}>Back</button> {/* Back button */}
//       <ul>
//         {contactsData.map((contact, index) => (
//           <li key={index}>
//             <p>Name: {contact.name}</p>
//             <p>Email: {contact.email}</p>
//             <p>Phone: {contact.phone}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ContactComponent;

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchChildProfile, fetchContacts } from '../apiService'

const ContactComponent = () => {
    const { type, childId } = useParams()
    const [contacts, setContacts] = useState([])
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await fetchChildProfile(childId)
                console.log('profileData:', profileData)
                const schoolId = profileData?.children?.[0]?.schoolId
                console.log('schoolId:', schoolId)

                if (!schoolId) {
                    // Handle missing schoolId gracefully (e.g., display error message)
                    return
                }

                const contactsData = await fetchContacts(type, schoolId)

                setUserData(profileData)
                setContacts(contactsData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [type, childId])

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <button onClick={handleBack} style={{ marginTop: '200px' }}>
                Back
            </button>

            <ul style={{ marginTop: '150px' }}>
                {userData.children &&
                    userData.children.map((child, index) => (
                        <li key={index}>
                            <p>{child.name}</p>
                            <p>{child.school}</p>
                        </li>
                    ))}
            </ul>
            <h2>Contacts</h2>
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        <p>Name: {contact.name}</p>
                        <p>Email: {contact.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContactComponent
