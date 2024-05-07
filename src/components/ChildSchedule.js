// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import { fetchSchedule, fetchChildProfile } from '../apiService'
// import { updateSchedule } from '../apiService'

// const ChildSchedule = () => {
//     const { childId, schoolId } = useParams()
//     const [schedule, setSchedule] = useState([])
//     const [userData, setUserData] = useState({})
//     const [updatedTimes, setUpdatedTimes] = useState({})

//     // const fetchSchedule = async () => {
//     //   try {
//     //     const response = await axios.get(`http://localhost:8800/schedule/${childId}`);
//     //     setSchedule(response.data);
//     //   } catch (error) {
//     //     console.error('Error fetching child schedule:', error);
//     //   }
//     // };

//     // useEffect(() => {
//     //   fetchSchedule();
//     // }, [childId]);

//     // const fetchChildSchedule = async () => {
//     //   try {
//     //     const childSchedule = await fetchSchedule(childId);
//     //     setSchedule(childSchedule);
//     //   } catch (error) {
//     //     console.error('Error fetching child schedule:', error);
//     //   }
//     // };

//     // useEffect(() => {
//     //   fetchChildSchedule();
//     // }, [childId]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [profileData, childSchedule] = await Promise.all([
//                     fetchChildProfile(childId, schoolId),
//                     fetchSchedule(childId)
//                 ])

//                 setUserData(profileData)
//                 setSchedule(childSchedule)
//             } catch (error) {
//                 console.error('Error fetching data:', error)
//             }
//         }

//         fetchData()
//     }, [childId, schoolId])

//     const handleTimeChange = (dayId, field, value) => {
//         setUpdatedTimes((prev) => ({
//             ...prev,
//             [dayId]: { ...prev[dayId], [field]: value }
//         }))
//     }

//     // const handleScheduleUpdate = async (dayId) => {
//     //   try {
//     //     const startTime = updatedTimes[dayId]?.start_time;
//     //     const endTime = updatedTimes[dayId]?.end_time;

//     //     console.log('dayId:', dayId);
//     //     console.log('startTime:', startTime);
//     //     console.log('endTime:', endTime);
//     //     console.log('Updated times:', updatedTimes); // Add this line for debugging

//     //     await axios.put(`http://localhost:8800/schedule/${childId}`, { dayId, endTime, startTime });

//     //     console.log('Schedule updated successfully');
//     //     // Refresh schedule after update
//     //     setUpdatedTimes({});
//     //     fetchSchedule(childId);
//     //   } catch (error) {
//     //     console.error('Error updating child schedule:', error);
//     //   }
//     // };

//     const handleScheduleUpdate = async (dayId) => {
//         try {
//             const startTime = updatedTimes[dayId]?.start_time
//             const endTime = updatedTimes[dayId]?.end_time

//             console.log('dayId:', dayId)
//             console.log('startTime:', startTime)
//             console.log('endTime:', endTime)
//             console.log('Updated times:', updatedTimes) // Add this line for debugging

//             await updateSchedule(childId, dayId, startTime, endTime)

//             console.log('Schedule updated successfully')
//             // Refresh schedule after update
//             setUpdatedTimes({})
//             fetchChildProfile(childId, schoolId)
//             fetchSchedule(childId)
//         } catch (error) {
//             console.error('Error updating child schedule:', error)
//         }
//     }

//     // const handleScheduleUpdate = async (dayId) => {
//     //   try {
//     //     const startTime = updatedTimes[dayId]?.start_time;
//     //     const endTime = updatedTimes[dayId]?.end_time;

//     //     console.log('dayId:', dayId);
//     //     console.log('startTime:', startTime);
//     //     console.log('endTime:', endTime);
//     //     console.log('Updated times:', updatedTimes); // Add this line for debugging

//     //     await updateSchedule(childId, dayId, startTime, endTime);

//     //     console.log('Schedule updated successfully');
//     //     // Refresh schedule after update
//     //     setUpdatedTimes({});
//     //   } catch (error) {
//     //     console.error('Error updating child schedule:', error);
//     //   }
//     // };

//     // useEffect(() => {
//     //   const fetchData = async () => {
//     //     try {
//     //       await fetchSchedule(childId); // Fetch schedule after updating times
//     //     } catch (error) {
//     //       console.error('Error fetching schedule:', error);
//     //     }
//     //   };

//     //   fetchData();
//     // }, [updatedTimes, childId]);

//     return (
//         <div style={{ marginTop: '200px' }}>
//             <h2>Child Schedule</h2>
//             <ul style={{ marginTop: '150px' }}>
//                 {userData.children &&
//                     userData.children.map((child, index) => (
//                         <li key={index}>
//                             <p>Name: {child.name}</p>

//                             <p>School: {child.school}</p>
//                         </li>
//                     ))}
//             </ul>
//             <ul>
//                 {schedule.map((scheduleItem) => (
//                     <li key={scheduleItem.day_id}>
//                         <strong>{scheduleItem.day_name}</strong> - Time:{' '}
//                         {scheduleItem.start_time} to {scheduleItem.end_time}
//                         <input
//                             type="time"
//                             value={
//                                 updatedTimes[scheduleItem.day_id]?.start_time ||
//                                 ''
//                             }
//                             onChange={(e) =>
//                                 handleTimeChange(
//                                     scheduleItem.day_id,
//                                     'start_time',
//                                     e.target.value
//                                 )
//                             }
//                         />
//                         to
//                         <input
//                             type="time"
//                             value={
//                                 updatedTimes[scheduleItem.day_id]?.end_time ||
//                                 ''
//                             }
//                             onChange={(e) =>
//                                 handleTimeChange(
//                                     scheduleItem.day_id,
//                                     'end_time',
//                                     e.target.value
//                                 )
//                             }
//                         />
//                         <button
//                             onClick={() =>
//                                 handleScheduleUpdate(scheduleItem.day_id)
//                             }
//                         >
//                             Update
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default ChildSchedule


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSchedule, fetchChildProfile } from '../apiService';
import { updateSchedule } from '../apiService';
import styled from 'styled-components';
import { useLanguage } from '../components/language/LanguageContext'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'

const ChildSchedule = () => {
  const { childId } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [userData, setUserData] = useState({});
  const [updatedTimes, setUpdatedTimes] = useState({});
  const {language} = useLanguage();
  const lang = language === 'se' ? se : en;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, childSchedule] = await Promise.all([
          fetchChildProfile(childId),
          fetchSchedule(childId)
        ]);

        setUserData(profileData);
        setSchedule(childSchedule);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [childId]);

  const handleTimeChange = (dayId, field, value) => {
    setUpdatedTimes((prev) => ({
      ...prev,
      [dayId]: { ...prev[dayId], [field]: value }
    }));
  };

  const handleScheduleUpdate = async (dayId) => {
    try {
      const startTime = updatedTimes[dayId]?.start_time;
      const endTime = updatedTimes[dayId]?.end_time;

      await updateSchedule(childId, dayId, startTime, endTime);

      // Refresh schedule after update
      fetchChildProfile(childId);
      fetchSchedule(childId);
    } catch (error) {
      console.error('Error updating child schedule:', error);
    }
  };

  return (
    <Container className='container'>
      <Heading>Child Schedule</Heading>
      <ChildInfoList>
        {userData.children &&
          userData.children.map((child, index) => (
            <ChildInfoItem key={index}>
              <p>{child.name}</p>
              <p>{child.school}</p>
            </ChildInfoItem>
          ))}
      </ChildInfoList>
      <ScheduleList>
        {schedule.map((scheduleItem) => (
          <ScheduleItem key={scheduleItem.day_id}>
            <strong>{scheduleItem.day_name}</strong> - {' '}
            {scheduleItem.start_time} to {scheduleItem.end_time}
            <TimeInput
              type="time"
              value={updatedTimes[scheduleItem.day_id]?.start_time || ''}
              onChange={(e) =>
                handleTimeChange(
                  scheduleItem.day_id,
                  'start_time',
                  e.target.value
                )
              }
            />
            to
            <TimeInput
              type="time"
              value={updatedTimes[scheduleItem.day_id]?.end_time || ''}
              onChange={(e) =>
                handleTimeChange(
                  scheduleItem.day_id,
                  'end_time',
                  e.target.value
                )
              }
            />
            <UpdateButton onClick={() => handleScheduleUpdate(scheduleItem.day_id)}>
              {lang.update}
            </UpdateButton>
          </ScheduleItem>
        ))}
      </ScheduleList>
    </Container>
  );
};

export default ChildSchedule;


const Container = styled.div`
  /* margin-top: 50px; */
  padding: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const ChildInfoList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const ChildInfoItem = styled.li`
  margin-bottom: 10px;
`;

const ScheduleList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const ScheduleItem = styled.li`
  margin-bottom: 20px;
`;

const TimeInput = styled.input`
  margin-left: 10px;
`;

const UpdateButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;
