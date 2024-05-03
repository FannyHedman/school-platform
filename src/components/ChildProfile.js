import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchChildProfile, fetchSchedule } from '../apiService'
import SideBar from './SideBar'
import styled from 'styled-components'
import { useLanguage } from '../components/language/LanguageContext'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'

const ChildProfile = () => {
    const { id, schoolId } = useParams()
    const [userData, setUserData] = useState({})
    const [todaysSchedule, setTodaysSchedule] = useState([])
    const navigate = useNavigate()
    const {language} = useLanguage();
    const lang = language === 'se' ? se : en


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataResponse = await fetchChildProfile(id, schoolId)
                setUserData(userDataResponse)

                const scheduleResponse = await fetchSchedule(id)
                const today = new Date().toLocaleDateString('en-US', {
                    weekday: 'long'
                })
                const dayId = getDayId(today)
                const todaysScheduleData = scheduleResponse.filter(
                    (item) => item.day_id === dayId
                )
                setTodaysSchedule(todaysScheduleData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [id, schoolId])

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

    return (
        <Container className="container">
            <BackButton onClick={handleBack}>Back</BackButton>
            <ChildInfo>
                <h2>Child Information</h2>
                <ul>
                    {userData.children &&
                        userData.children.map((child, index) => (
                            <li key={index}>
                                <p>{child.name}</p>
                                <p>{lang.child_age}: {child.age} {lang.year}</p>
                                <p>{child.school}</p>
                            </li>
                        ))}
                </ul>
            </ChildInfo>
            <Schedule>
                <h2>{lang.today}</h2>
                <ul>
                    {todaysSchedule.map((item, index) => (
                        <li key={index}>
                            <p>{item.day_name}</p>
                            <p>{lang.start_time}: {item.start_time}</p>
                            <p>{lang.end_time}: {item.end_time}</p>
                        </li>
                    ))}
                </ul>
            </Schedule>
            <SideBar id={id} schoolId={schoolId} />
        </Container>
    )
}

export default ChildProfile

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    /* margin-top: 20px; */
`

const BackButton = styled.button`
    position: absolute;
    top: 200px;
    left: 20px;`

const ChildInfo = styled.div`
    flex: 1;
    margin-right: 20px;
`

const Schedule = styled.div`
    flex: 1;
    margin-left: 20px;
`
