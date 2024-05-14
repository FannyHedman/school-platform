import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSchedule, reportAbsenceAllDay } from '../../apiService'

const ReportAbsence = () => {
    const { childId } = useParams()
    const navigate = useNavigate()
    const [todaysSchedule, setTodaysSchedule] = useState([])
    const [isSickAllDay, setIsSickAllDay] = useState(false)

    useEffect(() => {
        const fetchTodaysSchedule = async () => {
            try {
                const scheduleResponse = await fetchSchedule(childId)
                const today = new Date().toLocaleDateString('en-US', {
                    weekday: 'long'
                })
                const dayId = getDayId(today)
                const todaysScheduleData = scheduleResponse.filter(
                    (item) => item.day_id === dayId
                )
                setTodaysSchedule(todaysScheduleData)
            } catch (error) {
                console.error("Error fetching today's schedule:", error)
            }
        }

        fetchTodaysSchedule()
    }, [childId])

    const handleReportAbsence = async () => {
        try {
            if (isSickAllDay) {
                const today = new Date().toLocaleDateString('en-US', {
                    weekday: 'long'
                })
                const dayId = getDayId(today)
                await reportAbsenceAllDay(childId, false, dayId)
                console.log('Absence reported successfully')
            } else {
                console.log('Child is attending school today')
            }
        } catch (error) {
            console.error('Error reporting absence:', error)
        }
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
        <div>
            <h2>Report Absence</h2>
            <ul>
                {todaysSchedule.map((item, index) => (
                    <li key={index}>
                        <p>{item.day_name}</p>
                        <p>{item.start_time}</p>
                        <p>{item.end_time}</p>
                    </li>
                ))}
            </ul>
            <label>
                <input
                    type="checkbox"
                    checked={isSickAllDay}
                    onChange={(e) => setIsSickAllDay(e.target.checked)}
                />
                Sick All Day
            </label>
            <button onClick={handleReportAbsence}>Submit</button>
        </div>
    )
}

export default ReportAbsence
