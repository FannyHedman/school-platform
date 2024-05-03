// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchChildProfile, fetchContacts } from '../apiService';

// const ContactComponent = () => {
//     const { type, schoolId, childId } = useParams();
//     const [contacts, setContacts] = useState([]);
//     const [userData, setUserData] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {

//                 const [profileData, contactsData] = await Promise.all([
//                     fetchChildProfile(childId, schoolId),
//                     fetchContacts(type, schoolId)
//                 ]);

//                 setUserData(profileData);
//                 setContacts(contactsData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [type, schoolId, childId]);


//     const handleBack = () => {
//         navigate(-1);
//     };

//     return (
//         <div>
//             <button onClick={handleBack} style={{marginTop: '200px'}}>Back</button>


//             <ul style={{ marginTop: '150px' }}>
//         {userData.children &&
//           userData.children.map((child, index) => (
//             <li key={index}>
//               <p>{child.name}</p>
//               <p>{child.school}</p>
//             </li>
//           ))}
//       </ul>
//             <h2>Contacts</h2>
//             <ul>
//                 {contacts.map((contact, index) => (
//                     <li key={index}>
//                         <p>Name: {contact.name}</p>
//                         <p>Email: {contact.email}</p>

//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ContactComponent;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChildProfile, fetchContacts } from '../apiService';
import styled from 'styled-components';
import { useLanguage } from '../components/language/LanguageContext'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'

const ContactComponent = () => {
  const { type, schoolId, childId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const {language} = useLanguage();
  const lang = language === 'se' ? se : en;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, contactsData] = await Promise.all([
          fetchChildProfile(childId, schoolId),
          fetchContacts(type, schoolId)
        ]);

        setUserData(profileData);
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [type, schoolId, childId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container className='container'>
      <BackButton onClick={handleBack}>Back</BackButton>
      {type === 'teacher' && <h2>{lang.contact_teacher}</h2>}
      {type === 'management' && <h2>{lang.contact_management}</h2>}
      {type === 'health' && <h2>{lang.contact_health}</h2>}
      {type === 'parent' && <h2>{lang.contact_parents}</h2>}
      <ChildInfoList>
        {userData.children &&
          userData.children.map((child, index) => (
            <ChildInfoItem key={index}>
              {/* <p>Name: {child.name}</p> */}
              <p>{child.school}</p>
            </ChildInfoItem>
          ))}
      </ChildInfoList>
      {/* <Heading>Contacts</Heading> */}
      <ContactsList>
        {contacts.map((contact, index) => (
          <ContactItem key={index}>
            <ContactName>Name: {contact.name}</ContactName>
            <ContactEmail>Email: {contact.email}</ContactEmail>
            <ContactEmail>Phone: {contact.phone_number}</ContactEmail>
          </ContactItem>
        ))}
      </ContactsList>
    </Container>
  );
};

export default ContactComponent;

const Container = styled.div`
  /* margin-top: 50px; */
  padding: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ChildInfoList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const ChildInfoItem = styled.li`
  margin-bottom: 10px;
`;

const ContactsList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const ContactItem = styled.li`
  margin-bottom: 20px;
`;

const ContactName = styled.p`
  margin-bottom: 5px;
`;

const ContactEmail = styled.p`
  margin-bottom: 10px;
`;
