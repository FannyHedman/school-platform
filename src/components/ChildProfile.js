// import React from 'react'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import SideBar from './SideBar';


// const ChildProfile = () => {

//   const { id, schoolId } = useParams();
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const response = await axios.get(`http://localhost:8800/childprofile/${id}/${schoolId}`);
//               setUserData(response.data);
//           } catch (error) {
//               console.error('Error fetching user profile:', error);
//           }
//       };

//       fetchData();
//   }, [id, schoolId]);
//   return (
//     <div>            <ul style={{marginTop: '150px'}}>
//     {userData.children &&
//         userData.children.map((child, index) => (
//             <li key={index}>

//                 <p>Name: {child.name}</p>
//                 <p>Age: {child.age}</p>
//                 <p>School: {child.school}</p>
//             </li>
//         ))}
// </ul>
// <SideBar/></div>
//   )
// }

// export default ChildProfile


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChildProfile } from '../apiService';
import SideBar from './SideBar';

const ChildProfile = () => {
  const { id, schoolId } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChildProfile(id, schoolId);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [id, schoolId]);


    const handleBack = () => {
      navigate(-1);
    };
  return (
    <div>
            <button style={{marginTop: '200px'}} onClick={handleBack}>Back</button>

      <ul style={{ marginTop: '150px' }}>
        {userData.children &&
          userData.children.map((child, index) => (
            <li key={index}>
              <p>Name: {child.name}</p>
              <p>Age: {child.age}</p>
              <p>School: {child.school}</p>
            </li>
          ))}
      </ul>
      <SideBar id={id} schoolId={schoolId} />
    </div>
  );
};

export default ChildProfile;
