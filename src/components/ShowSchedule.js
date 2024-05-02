// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import { fetchChildProfile, fetchSchedule } from '../apiService'

// const ShowSchedule = () => {

//   const {childId, id} = useParams()
//   const [showSchedule, setShowSchedule] = useState([])
//   const [userData, setUserData] = useState({});
//   const [childName, setChildName] = useState('')

//   // const fetchSchedule = async () => {
//   //   try { const response = await axios.get(`http://localhost:8800/schedule/${childId}`);
//   // setShowSchedule(response.data)}
//   // catch (error) {
//   //   console.error('Error fetching child schedule:', error);
//   // }}

//   // useEffect(() => {
//   //   fetchSchedule();

//   // })

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const schedule = await fetchSchedule(childId);
//         // const name = await fetchChildProfile(childId);
//         setShowSchedule(schedule);
//         // setChildName(name);
//       } catch (error) {
//         console.error('Error fetching weeks:', error);
//       }
//     };

//     fetchData();
//   }, [childId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchChildProfile(id);
//         setUserData(data);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div style={{marginTop: '200px'}}><h2>Show schedule</h2><ul style={{ marginTop: '150px' }}>
//     {userData.children &&
//       userData.children.map((child, index) => (
//         <li key={index}>
//           <p>Name: {child.name}</p>
//           <p>Age: {child.age}</p>
//           <p>School: {child.school}</p>
//         </li>
//       ))}
//   </ul><div>
//       <ul>{showSchedule.map((item) => (
//         <li key={item.day_id}><p>{item.day_name}</p><p>{item.start_time}</p><p>{item.end_time}</p></li>
//       ))}

//       </ul></div></div>
//   )
// }

// export default ShowSchedule


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChildProfile, fetchSchedule } from '../apiService';

const ShowSchedule = () => {
  const { childId, schoolId } = useParams();
  const [showSchedule, setShowSchedule] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, scheduleData] = await Promise.all([
          fetchChildProfile(childId, schoolId),
          fetchSchedule(childId),
        ]);

        setUserData(profileData);
        setShowSchedule(scheduleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [childId, schoolId]);

        const handleBack = () => {
          navigate(-1);
        };

  return (
    <div>
            <button style={{marginTop: '200px'}} onClick={handleBack}>Back</button>
      <h2>Show Schedule</h2>

      <ul style={{ marginTop: '150px' }}>
        {userData.children &&
          userData.children.map((child, index) => (
            <li key={index}>
              <p>{child.name}</p>
              <p>{child.school}</p>
            </li>
          ))}
      </ul>

      <ul>
        {showSchedule.map((item) => (
          <li key={item.day_id}>
            <p>{item.day_name}</p>
            <p>{item.start_time}</p>
            <p>{item.end_time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowSchedule;
