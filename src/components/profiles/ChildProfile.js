// // import React, { useEffect, useState } from 'react'
// // import { useParams, useNavigate } from 'react-router-dom'
// // import { fetchChildProfile, fetchSchedule, fetchMeals } from '../../apiService'
// // import SideBar from '../navigation/SideBar'
// // import styled from 'styled-components'
// // import { useLanguage } from '../language/LanguageContext'
// // import en from '../language/languages/EN.json'
// // import se from '../language/languages/SE.json'
// // import { useLocation } from 'react-router-dom'

// // const ChildProfile = () => {
// //     const { id } = useParams()
// //     const [userData, setUserData] = useState({})
// //     const [todaysSchedule, setTodaysSchedule] = useState([])
// //     const navigate = useNavigate()
// //     const { language } = useLanguage()
// //     const lang = language === 'se' ? se : en
// //     const location = useLocation()
// //     const [updatedId, setUpdatedId] = useState(id)
// //     const [todaysMeal, setTodaysMeal] = useState('')

// //     useEffect(() => {
// //         const storedChildId = localStorage.getItem('childId')

// //         if (storedChildId && storedChildId !== id) {
// //             setUpdatedId(storedChildId)
// //         } else {
// //             const fetchData = async () => {
// //                 try {
// //                     const userDataResponse = await fetchChildProfile(id)
// //                     setUserData(userDataResponse)
// //                     localStorage.setItem('childId', id)

// //                     const schoolId = userDataResponse.schoolId
// //                     localStorage.setItem('schoolId', schoolId)

// //                     const scheduleResponse = await fetchSchedule(id)
// //                     const today = new Date().toLocaleDateString('en-US', {
// //                         weekday: 'long'
// //                     })
// //                     const dayId = getDayId(today)
// //                     const todaysScheduleData = scheduleResponse.filter(
// //                         (item) => item.day_id === dayId
// //                     )
// //                     setTodaysSchedule(todaysScheduleData)

// //                     const todaysMeal = await getTodaysMeal();
// //                     setTodaysMeal(todaysMeal);

// //                 } catch (error) {
// //                     console.error('Error fetching data:', error)
// //                 }
// //             }

// //             fetchData()
// //         }
// //     }, [id, updatedId, location])

// //     const handleBack = () => {
// //         navigate(-1)
// //     }

// //     const getDayId = (weekday) => {
// //         switch (weekday) {
// //             case 'Monday':
// //                 return 1
// //             case 'Tuesday':
// //                 return 2
// //             case 'Wednesday':
// //                 return 3
// //             case 'Thursday':
// //                 return 4
// //             case 'Friday':
// //                 return 5
// //             default:
// //                 return -1
// //         }
// //     }

// //     const getTodaysMeal = async () => {
// //       try {
// //           const mealsData = await fetchMeals();
// //           const meals = mealsData.meals;
// //           console.log(meals);
// //           const today = new Date().toLocaleDateString('en-US', {
// //               weekday: 'long'
// //           });
// //           const dayId = getDayId(today);
// //           console.log(dayId);
// //           const todaysMeal = meals.find(meal => meal.day === dayId);
// //           console.log(todaysMeal);
// //           return todaysMeal;
// //       } catch (error) {
// //           console.error('Error getting today\'s meal:', error);
// //           return null;
// //       }
// //   };

// //     return (
// //         <Container className="container">
// //             {/* <BackButton onClick={handleBack}>Back</BackButton> */}
// //             <ChildInfo>
// //                 <h2>Child Information</h2>
// //                 <ul>
// //                     {userData.children &&
// //                         userData.children.map((child, index) => (
// //                             <li key={index}>
// //                                 <Paragraph>{child.name}</Paragraph>
// //                                 <p>
// //                                     {lang.child_age}: {child.age} {lang.year}
// //                                 </p>
// //                                 <p>{child.school}</p>
// //                             </li>
// //                         ))}
// //                 </ul>
// //             </ChildInfo>
// //             <Schedule>
// //                 <h2>{lang.today}</h2>
// //                 {todaysSchedule.map((item, index) => (
// //                     <li key={index}>
// //                         {item.attending ? (
// //                             <>
// //                                 <p>{item.day_name}</p>
// //                                 <p>
// //                                     {lang.start_time}: {item.start_time}
// //                                 </p>
// //                                 <p>
// //                                     {lang.end_time}: {item.end_time}
// //                                 </p>
// //                             </>
// //                         ) : (
// //                             <p>Absent today</p>
// //                         )}
// //                     </li>
// //                 ))}
// //                 <div>
// //                     {todaysMeal ? (
// //                         <div>
// //                             <h2>Today's Meal</h2>
// //                             <p>{todaysMeal.lunch}</p>
// //                         </div>
// //                     ) : (
// //                         <p>Loading...</p>
// //                     )}
// //                 </div>
// //             </Schedule>
// //         </Container>
// //     )
// // }

// // export default ChildProfile

// // const Container = styled.div`
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: flex-start;
// // `

// // const BackButton = styled.button`
// //     position: absolute;
// //     top: 200px;
// //     left: 20px;
// // `

// // const ChildInfo = styled.div`
// //     flex: 1;
// //     margin-right: 20px;
// // `

// // const Schedule = styled.div`
// //     flex: 1;
// //     margin-left: 20px;
// // `

// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { fetchChildProfile, fetchSchedule, fetchMeals } from '../../apiService'
// import SideBar from '../navigation/SideBar'
// import styled from 'styled-components'
// import { useLanguage } from '../language/LanguageContext'
// import en from '../language/languages/EN.json'
// import se from '../language/languages/SE.json'
// import { useLocation } from 'react-router-dom'

// const ChildProfile = () => {
//     const { id } = useParams()
//     const [userData, setUserData] = useState({})
//     const [todaysSchedule, setTodaysSchedule] = useState([])
//     const navigate = useNavigate()
//     const { language } = useLanguage()
//     const lang = language === 'se' ? se : en
//     const location = useLocation()
//     const [updatedId, setUpdatedId] = useState(id)
//     const [todaysMeal, setTodaysMeal] = useState('')

//     useEffect(() => {
//         const storedChildId = localStorage.getItem('childId')

//         if (storedChildId && storedChildId !== id) {
//             setUpdatedId(storedChildId)
//         } else {
//             const fetchData = async () => {
//                 try {
//                     const userDataResponse = await fetchChildProfile(id)
//                     setUserData(userDataResponse)
//                     localStorage.setItem('childId', id)

//                     const schoolId = userDataResponse.schoolId
//                     localStorage.setItem('schoolId', schoolId)

//                     const scheduleResponse = await fetchSchedule(id)
//                     const today = new Date().toLocaleDateString('en-US', {
//                         weekday: 'long'
//                     })
//                     const dayId = getDayId(today)
//                     const todaysScheduleData = scheduleResponse.filter(
//                         (item) => item.day_id === dayId
//                     )
//                     setTodaysSchedule(todaysScheduleData)

//                     const todaysMeal = await getTodaysMeal();
//                     setTodaysMeal(todaysMeal);

//                 } catch (error) {
//                     console.error('Error fetching data:', error)
//                 }
//             }

//             fetchData()
//         }
//     }, [id, updatedId, location])

//     const handleBack = () => {
//         navigate(-1)
//     }

//     const getDayId = (weekday) => {
//         switch (weekday) {
//             case 'Monday':
//                 return 1
//             case 'Tuesday':
//                 return 2
//             case 'Wednesday':
//                 return 3
//             case 'Thursday':
//                 return 4
//             case 'Friday':
//                 return 5
//             default:
//                 return -1
//         }
//     }

//     const getTodaysMeal = async () => {
//       try {
//           const mealsData = await fetchMeals();
//           const meals = mealsData.meals;
//           console.log(meals);
//           const today = new Date().toLocaleDateString('en-US', {
//               weekday: 'long'
//           });
//           const dayId = getDayId(today);
//           console.log(dayId);
//           const todaysMeal = meals.find(meal => meal.day === dayId);
//           console.log(todaysMeal);
//           return todaysMeal;
//       } catch (error) {
//           console.error('Error getting today\'s meal:', error);
//           return null;
//       }
//   };

//     return (
//         <Container className="container">
//             {/* <BackButton onClick={handleBack}>Back</BackButton> */}
//             <ChildInfo>
//                 <h2>Child Information</h2>
//                 <ul>
//                     {userData.children &&
//                         userData.children.map((child, index) => (
//                             <li key={index}>
//                                 <p>{child.name}</p>
//                                 <p>
//                                     {lang.child_age}: {child.age} {lang.year}
//                                 </p>
//                                 <p>{child.school}</p>
//                             </li>
//                         ))}
//                 </ul>
//             </ChildInfo>
//             <Schedule>
//                 <h2>{lang.today}</h2>
//                 {todaysSchedule.map((item, index) => (
//                     <li key={index}>
//                         {item.attending ? (
//                             <>
//                                 <p>{item.day_name}</p>
//                                 <p>
//                                     {lang.start_time}: {item.start_time}
//                                 </p>
//                                 <p>
//                                     {lang.end_time}: {item.end_time}
//                                 </p>
//                             </>
//                         ) : (
//                             <p>Absent today</p>
//                         )}
//                     </li>
//                 ))}
//                 <div>
//                     {todaysMeal ? (
//                         <div>
//                             <h2>Today's Meal</h2>
//                             <p>{todaysMeal.lunch}</p>
//                         </div>
//                     ) : (
//                         <p>Loading...</p>
//                     )}
//                 </div>
//             </Schedule>
//         </Container>
//     )
// }

// export default ChildProfile

// const Container = styled.div`
//     display: flex;
//     justify-content: flex-end; /* Align content to the right */
//     align-items: flex-start; /* Align content to the top */
// `

// const ChildInfo = styled.div`
//     /* flex: 1;  */
//     margin-right: 20px; /* Add margin to the right */
// `

// const Schedule = styled.div`
//     /* flex: 1; */
//     margin-left: 20px; /* Add margin to the left */
// `

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchChildProfile, fetchSchedule, fetchMeals } from '../../apiService'
import SideBar from '../navigation/SideBar'
import styled from 'styled-components'
import { useLanguage } from '../language/LanguageContext'
import en from '../language/languages/EN.json'
import se from '../language/languages/SE.json'
import { useLocation } from 'react-router-dom'

const ChildProfile = () => {
    const { id } = useParams()
    const [userData, setUserData] = useState({})
    const [todaysSchedule, setTodaysSchedule] = useState([])
    const navigate = useNavigate()
    const { language } = useLanguage()
    const lang = language === 'se' ? se : en
    const location = useLocation()
    const [updatedId, setUpdatedId] = useState(id)
    const [todaysMeal, setTodaysMeal] = useState('')

    useEffect(() => {
        const storedChildId = localStorage.getItem('childId')

        if (storedChildId && storedChildId !== id) {
            setUpdatedId(storedChildId)
        } else {
            const fetchData = async () => {
                try {
                    const userDataResponse = await fetchChildProfile(id)
                    setUserData(userDataResponse)
                    localStorage.setItem('childId', id)

                    const schoolId = userDataResponse.schoolId
                    localStorage.setItem('schoolId', schoolId)

                    const scheduleResponse = await fetchSchedule(id)
                    const today = new Date().toLocaleDateString('en-US', {
                        weekday: 'long'
                    })
                    const dayId = getDayId(today)
                    const todaysScheduleData = scheduleResponse.filter(
                        (item) => item.day_id === dayId
                    )
                    setTodaysSchedule(todaysScheduleData)

                    const todaysMeal = await getTodaysMeal()
                    setTodaysMeal(todaysMeal)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }

            fetchData()
        }
    }, [id, updatedId, location])

    const handleBack = () => {
        navigate(-1)
    }

    const getDayId = (weekday) => {
        switch (weekday) {
            case 'Monday':
                return 1
            case 'Tuesday':
                return 2
            case 'Wednesday':
                return 3
            case 'Thursday':
                return 4
            case 'Friday':
                return 5
            default:
                return -1
        }
    }

    const getTodaysMeal = async () => {
        try {
            const mealsData = await fetchMeals()
            const meals = mealsData.meals
            console.log(meals)
            const today = new Date().toLocaleDateString('en-US', {
                weekday: 'long'
            })
            const dayId = getDayId(today)
            console.log(dayId)
            const todaysMeal = meals.find((meal) => meal.day === dayId)
            console.log(todaysMeal)
            return todaysMeal
        } catch (error) {
            console.error("Error getting today's meal:", error)
            return null
        }
    }

    return (
        <Container className="container">
            {/* <BackButton onClick={handleBack}>Back</BackButton> */}
            <ChildInfoCard>
                <CardHeader>{lang.your_child}</CardHeader>
                <CardBody>
                    <ul>
                        {userData.children &&
                            userData.children.map((child, index) => (
                                <li key={index}>
                                    <Paragraph>{child.name}</Paragraph>
                                    <Paragraph>
                                        {lang.child_age}: {child.age}{' '}
                                        {lang.year}
                                    </Paragraph>
                                    <Paragraph>{child.school}</Paragraph>
                                </li>
                            ))}
                    </ul>
                </CardBody>
            </ChildInfoCard>
            <ScheduleCard>
                <CardHeader>{lang.todays_schedule}</CardHeader>
                <CardBody>
                    {todaysSchedule.map((item, index) => (
                        <li key={index}>
                            {item.attending ? (
                                <>
                                    <Paragraph>{item.day_name}</Paragraph>
                                    <Paragraph>
                                        {lang.start_time}: {item.start_time}
                                    </Paragraph>
                                    <Paragraph>
                                        {lang.end_time}: {item.end_time}
                                    </Paragraph>
                                </>
                            ) : (
                                <Paragraph>Absent today</Paragraph>
                            )}
                        </li>
                    ))}
                </CardBody>
            </ScheduleCard>
            <MealCard>
                <CardHeader>{lang.todays_meal}</CardHeader>
                <CardBody>
                    {todaysMeal ? (
                        <Paragraph>{todaysMeal.lunch}</Paragraph>
                    ) : (
                        <Paragraph>Loading...</Paragraph>
                    )}
                </CardBody>
            </MealCard>
        </Container>
    )
}

export default ChildProfile

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`

const Card = styled.div`
    /* background-color: #ffffff; */
    border-radius: 8px;
    border: 1px solid black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
    margin-bottom: 20px;
    flex: 1;
    height: 200px;
`

const CardHeader = styled.h2`
    margin-bottom: 30px;
    font-family: 'Courier New', Courier, monospace;
`

const Paragraph = styled.p`
    font-family: 'Comfortaa', sans-serif;
    /* font-weight: medium; */
`

const CardBody = styled.div`
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 10px;
        list-style-type: none;
    }
`

const ChildInfoCard = styled(Card)`
    margin-right: 20px;
`

const ScheduleCard = styled(Card)`
    margin-right: 20px;
`

const MealCard = styled(Card)``
