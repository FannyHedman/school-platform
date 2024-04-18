import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useLanguage } from '../components/language/LanguageContext'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'

const UserProfile = () => {
    const { id } = useParams()
    console.log('ID:', id)

    const { language } = useLanguage()
    const lang = language === 'se' ? se : en

    const [userData, setUserData] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:8800/accounts/${id}`)
            .then((response) => {
                setUserData(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    return (
        <div style={{ margin: '100px' }}>
            <p>User Profile</p>
            <p>
                {lang.welcome_user} {userData.parent_name}!
            </p>
            <p>Barn: {userData.first_child_name}</p>
            <p>Barn: {userData.second_child_name}</p>
        </div>
    )
}

export default UserProfile
