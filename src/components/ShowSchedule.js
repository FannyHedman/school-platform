// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { fetchChildProfile, fetchSchedule } from '../apiService';

// // const ShowSchedule = () => {
// //   const { childId, schoolId } = useParams();
// //   const [showSchedule, setShowSchedule] = useState([]);
// //   const [userData, setUserData] = useState({});
// //   const navigate = useNavigate();


// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [profileData, scheduleData] = await Promise.all([
// //           fetchChildProfile(childId, schoolId),
// //           fetchSchedule(childId),
// //         ]);

// //         setUserData(profileData);
// //         setShowSchedule(scheduleData);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     fetchData();
// //   }, [childId, schoolId]);

// //         const handleBack = () => {
// //           navigate(-1);
// //         };

// //   return (
// //     <div>
// //             <button style={{marginTop: '200px'}} onClick={handleBack}>Back</button>
// //       <h2>Show Schedule</h2>

// //       <ul style={{ marginTop: '150px' }}>
// //         {userData.children &&
// //           userData.children.map((child, index) => (
// //             <li key={index}>
// //               <p>{child.name}</p>
// //               <p>{child.school}</p>
// //             </li>
// //           ))}
// //       </ul>

// //       <ul>
// //         {showSchedule.map((item) => (
// //           <li key={item.day_id}>
// //             <p>{item.day_name}</p>
// //             <p>{item.start_time}</p>
// //             <p>{item.end_time}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default ShowSchedule;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchChildProfile, fetchSchedule } from '../apiService';
// import styled from 'styled-components';
// import { useLanguage } from '../components/language/LanguageContext'
// import en from '../components/language/languages/EN.json'
// import se from '../components/language/languages/SE.json'

// const ShowSchedule = () => {
//   const { childId, schoolId } = useParams();
//   const [showSchedule, setShowSchedule] = useState([]);
//   const [userData, setUserData] = useState({});
//   const navigate = useNavigate();
//   const {language} = useLanguage();
//   const lang = language === 'se' ? se : en;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [profileData, scheduleData] = await Promise.all([
//           fetchChildProfile(childId, schoolId),
//           fetchSchedule(childId),
//         ]);

//         setUserData(profileData);
//         setShowSchedule(scheduleData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [childId, schoolId]);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className='container'>
//       <button style={{ marginTop: '20px' }} onClick={handleBack}>Back</button>
//       <h2>{lang.schedule}</h2>

//       <ul style={{ marginTop: '20px' }}>
//         {userData.children &&
//           userData.children.map((child, index) => (
//             <li key={index}>
//               <p>{child.name}</p>
//               <p>{child.school}</p>
//             </li>
//           ))}
//       </ul>

//       <Table style={{ marginTop: '20px' }}>
//         <thead>
//           <tr>
//             <Th>{lang.day}</Th>
//             <Th>{lang.start_time}</Th>
//             <Th>{lang.end_time}</Th>
//           </tr>
//         </thead>
//         <tbody>
//           {showSchedule.map((item) => (
//             <tr key={item.day_id}>
//               <Td>{item.day_name}</Td>
//               <Td>{item.start_time}</Td>
//               <Td>{item.end_time}</Td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ShowSchedule;


// const Table = styled.table`
//   border-collapse: collapse;
//   width: 50%;
// `;

// const Th = styled.th`
//   border: 1px solid #ddd;
//   padding: 8px;
//   text-align: left;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 8px;
// `;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChildProfile, fetchSchedule } from '../apiService';
import styled from 'styled-components';
import { useLanguage } from '../components/language/LanguageContext';
import en from '../components/language/languages/EN.json';
import se from '../components/language/languages/SE.json';

const ShowSchedule = ({childId}) => {

  const [showSchedule, setShowSchedule] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lang = language === 'se' ? se : en;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await fetchChildProfile(childId);
        setUserData(profileData);

        const scheduleData = await fetchSchedule(childId);
        setShowSchedule(scheduleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [childId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='container'>
      <button style={{ marginTop: '20px' }} onClick={handleBack}>Back</button>
      <h2>{lang.schedule}</h2>

      <ul style={{ marginTop: '20px' }}>
        {userData.children &&
          userData.children.map((child, index) => (
            <li key={index}>
              <p>{child.name}</p>
              <p>{child.school}</p>
            </li>
          ))}
      </ul>

      <Table style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <Th>{lang.day}</Th>
            <Th>{lang.start_time}</Th>
            <Th>{lang.end_time}</Th>
          </tr>
        </thead>
        <tbody>
          {showSchedule.map((item) => (
            <tr key={item.day_id}>
              <Td>{item.day_name}</Td>
              <Td>{item.start_time}</Td>
              <Td>{item.end_time}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ShowSchedule;


const Table = styled.table`
  border-collapse: collapse;
  width: 50%;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;
