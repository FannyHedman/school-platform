// ApiServiceContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserData, fetchChildProfile, fetchContacts, fetchWeeks, fetchSchedule } from './apiService';

// Create the context
const ApiServiceContext = createContext();

// Create a provider component
export const ApiServiceProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [childProfile, setChildProfile] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [weeks, setWeeks] = useState(null);
    const [schedule, setSchedule] = useState(null);

    const { id: userId, childId, schoolId } = useParams(); // Extract childId and schoolId using useParams

    // Fetch data when the component mounts or when childId or schoolId changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const userId = userData.id;

                const userData = await fetchUserData(userId);
                const childProfileData = await fetchChildProfile(childId, schoolId);
                const contactsData = await fetchContacts(/* parameters */);
                const weeksData = await fetchWeeks(childId);
                const scheduleData = await fetchSchedule(childId);

                setUserData(userData);
                setChildProfile(childProfileData);
                setContacts(contactsData);
                setWeeks(weeksData);
                setSchedule(scheduleData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId, childId, schoolId]); // Trigger the effect whenever childId or schoolId changes

    // Make the context value
    const contextValue = {
        userData,
        childProfile,
        contacts,
        weeks,
        schedule
    };

    return <ApiServiceContext.Provider value={contextValue}>{children}</ApiServiceContext.Provider>;
};

// Create a custom hook to consume the context
export const useApiService = () => {
    return useContext(ApiServiceContext);
};
