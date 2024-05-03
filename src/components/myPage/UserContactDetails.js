// import React from 'react'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useLanguage } from '../language/LanguageContext'
// import en from '../language/languages/EN.json'
// import se from '../language/languages/SE.json'
// import { useParams } from 'react-router-dom'

// const UserContactDetails = () => {

//   const { id } = useParams()
//   const [userData, setUserData] = useState({})
//   const {language} = useLanguage();
//   const lang = language === 'se' ? se : en;
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:8800/accounts/${id}`
//             )
//             setUserData(response.data)
//         } catch (error) {
//             console.error('Error fetching user profile:', error)
//         }
//     }

//     fetchData()
// }, [id])
//   return (
//     <div>UserContactDetails</div>
//   )
// }

// export default UserContactDetails


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../apiService';

const UserContactDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(id);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2>User Contact Details</h2>
      <p>ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Phone Number: {userData.phoneNumber}</p>
      <p>Address: {userData.address}</p>
    </div>
  );
};

export default UserContactDetails;
