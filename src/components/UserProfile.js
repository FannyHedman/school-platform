

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useLanguage } from '../components/language/LanguageContext';
// import en from '../components/language/languages/EN.json';
// import se from '../components/language/languages/SE.json';

// const UserProfile = () => {
//     const { id } = useParams();
//     const { language } = useLanguage();
//     const lang = language === 'se' ? se : en;

//     const [userData, setUserData] = useState({});

//     useEffect(() => {
//         axios
//             .get(`http://localhost:8800/accounts/${id}`)
//             .then((response) => {
//                 setUserData(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, [id]);

//     useEffect(() => {
//         // Fetch schedule data for each child
//         if (userData.children) {
//             userData.children.forEach((child) => {
//                 axios
//                     .get(`http://localhost:8800/schedule/${child.id}`)
//                     .then((response) => {
//                         const updatedChild = { ...child, schedule: response.data };
//                         setUserData((prevData) => ({
//                             ...prevData,
//                             children: prevData.children.map((prevChild) =>
//                                 prevChild.id === child.id ? updatedChild : prevChild
//                             ),
//                         }));
//                     })
//                     .catch((error) => {
//                         console.error(error);
//                     });
//             });
//         }
//     }, [userData.children]);

//     const getLocalizedDayOfWeek = (dayOfWeek) => {
//         // Define day names in English and Swedish
//         const dayNames = {
//             en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//             se: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
//         };
//         return dayNames[language][dayOfWeek];
//     };

//     return (
//         <div style={{ margin: '100px' }}>
//             <p>User Profile</p>
//             <p>
//                 {lang.welcome_user} {userData.parent_name}!
//             </p>
//             <p>Children:</p>
//             <ul>
//                 {userData.children &&
//                     userData.children.map((child, index) => (
//                         <li key={index}>
//                             <p>Name: {child.name}</p>
//                             <p>Age: {child.age}</p>
//                             <p>School: {child.school}</p>
//                             <p>Schedule:</p>
//                             <ul>
//                                 {child.schedule &&
//                                     child.schedule.map((scheduleEntry, index) => (
//                                         <li key={index}>
//                                             {getLocalizedDayOfWeek(scheduleEntry.day_of_week)}: {scheduleEntry.start_time} - {scheduleEntry.end_time}
//                                         </li>
//                                     ))}
//                             </ul>
//                         </li>
//                     ))}
//             </ul>
//         </div>
//     );
// };

// export default UserProfile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const UserProfile = () => {
//     const { id } = useParams();
//     const [userData, setUserData] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8800/accounts/${id}`);
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             }
//         };

//         fetchData();
//     }, [id]);

//     return (
//         <div style={{ margin: '100px' }}>
//             <p>User Profile</p>
//             <p>
//                 Welcome {userData.parent_name}!
//             </p>
//             <p>Children:</p>
//             <ul>
//                 {userData.children &&
//                     userData.children.map((child, index) => (
//                         <li key={index}>
//                             <p>Name: {child.name}</p>
//                             <p>Age: {child.age}</p>
//                             <p>School: {child.school}</p>
//                             {/* <p>Schedule:</p>
//                             <ul>
//                                 <li>
//                                     {child.schedule && (
//                                         <p>
//                                             {child.schedule.day_of_week}: {child.schedule.start_time} - {child.schedule.end_time}
//                                         </p>
//                                     )}
//                                 </li>
//                             </ul> */}
//                         </li>
//                     ))}
//             </ul>
//         </div>
//     );
// };

// export default UserProfile;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/accounts/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div style={{ margin: '100px' }}>
            <p>User Profile</p>
            <p>
                Welcome {userData.parent_name}!
            </p>
            <p>Children:</p>
            <ul>
                {userData.children &&
                    userData.children.map((child, index) => (
                        <li key={index}>
                            <Link to={`/childprofile/${child.id}`}>Name: {child.name}</Link>
                            <p>Age: {child.age}</p>
                            <p>School: {child.school}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default UserProfile;
