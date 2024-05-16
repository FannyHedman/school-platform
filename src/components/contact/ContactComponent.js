import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchChildProfile, fetchContacts } from '../../apiService'
import styled from 'styled-components'
import { useLanguage } from '../language/LanguageContext'
import en from '../language/languages/EN.json'
import se from '../language/languages/SE.json'

const ContactComponent = () => {
    const { type, childId } = useParams()
    const [contacts, setContacts] = useState([])
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    const { language } = useLanguage()
    const lang = language === 'se' ? se : en

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await fetchChildProfile(childId)
                const schoolId = profileData?.children?.[0]?.schoolId

                if (!schoolId) {
                    // Handle missing schoolId gracefully (e.g., display error message)
                    return
                }

                const contactsData = await fetchContacts(type, schoolId)

                setUserData(profileData)
                setContacts(contactsData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [type, childId])

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div id="contact-container">
            <Container className="container">
                <ContactCard>
                    <ChildList>
                        {userData.children &&
                            userData.children.map((child, index) => (
                                <li key={index}>
                                    <h3 className="child-name">{child.name}</h3>
                                    <h2 className="school-name">
                                        {child.school}
                                    </h2>
                                </li>
                            ))}
                        {type === 'teacher' && (
                            <h3 className="contact-name">
                                {lang.contact_teacher}
                            </h3>
                        )}
                        {type === 'health' && (
                            <h3 className="contact-name">
                                {lang.contact_health}
                            </h3>
                        )}
                        {type === 'management' && (
                            <h3 className="contact-name">
                                {lang.contact_management}
                            </h3>
                        )}
                        {type === 'parent' && (
                            <h3 className="contact-name">
                                {lang.contact_parents}
                            </h3>
                        )}
                    </ChildList>
                    {/* <ContactsWrapper> */}
                    {/* {type === 'teacher' && <h3 className='school-name'>{lang.contact_teacher}</h3>}
                        {type === 'health' && <h3>{lang.contact_health}</h3>}
                        {type === 'management' && (
                            <h3>{lang.contact_management}</h3>
                        )}
                        {type === 'parent' && <h3>{lang.contact_parents}</h3>} */}
                    <ul>
                        {contacts.map((contact, index) => (
                            <ContactItem key={index}>
                                <p style={{ fontWeight: 'bold' }}>
                                    {contact.name}
                                </p>
                                <p>{contact.email}</p>
                                <p>{contact.phone_number}</p>
                            </ContactItem>
                        ))}
                    </ul>
                    {/* </ContactsWrapper> */}
                </ContactCard>
            </Container>
        </div>
    )
}

export default ContactComponent

const Container = styled.div`
    /* background-image: url('../../assets/background.jpg');
    background-size: cover;
    background-position: center;
    padding: 20px;
    min-height: 100vh; */
`

const BackButton = styled.button`
    margin-bottom: 20px;
`

const ChildList = styled.ul`
    list-style: none;
    padding: 0;
    /* margin-bottom: 20px; */
`

const ContactCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;

    ul {
        list-style: none;
        /* padding: 0; */
        padding: 30px;
        margin: 0;
    }
`

const ContactItem = styled.li`
    margin-bottom: 50px;
    position: relative;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        bottom: -15px; /* Adjust this value based on your preference */
        left: 0;
        width: 100%;
        height: 2px;
        background-color: black;
    }
`
const ContactsWrapper = styled.div`
    /* margin-top: 50px; */
`
