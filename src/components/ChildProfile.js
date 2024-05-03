import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChildProfile, fetchSchedule } from '../apiService';
import SideBar from './SideBar';

const ChildProfile = () => {
    const { id, schoolId } = useParams();
    const [userData, setUserData] = useState({});
    const [todaysSchedule, setTodaysSchedule] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataResponse = await fetchChildProfile(id, schoolId);
                setUserData(userDataResponse);

                const scheduleResponse = await fetchSchedule(id);
                const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                const dayId = getDayId(today); 
                const todaysScheduleData = scheduleResponse.filter(item => item.day_id === dayId);
                setTodaysSchedule(todaysScheduleData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, schoolId]);

    const handleBack = () => {
        navigate(-1);
    };

    const getDayId = (weekday) => {
        switch (weekday) {
            case 'Monday':
                return 1;
            case 'Tuesday':
                return 2;
            case 'Wednesday':
                return 3;
            case 'Thursday':
                return 4;
            case 'Friday':
                return 5;
            default:
                return -1;
        }
    };

    return (
        <div>
            <div className="container">
                <button style={{ marginTop: '200px' }} onClick={handleBack}>
                    Back
                </button>

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
            </div>
            <div>
                <h2>Schedule for Today</h2>
                <ul>
                    {todaysSchedule.map((item, index) => (
                        <li key={index}>
                            <p>Start Time: {item.start_time}</p>
                            <p>End Time: {item.end_time}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <SideBar id={id} schoolId={schoolId} />
        </div>
    );
};

export default ChildProfile;
