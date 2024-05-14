import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useLanguage } from '../language/LanguageContext'
import en from '../language/languages/EN.json'
import se from '../language/languages/SE.json'
import { fetchUserData } from '../../apiService'

const UserProfile = ({}) => {
    const { userId } = useParams()
    const [userData, setUserData] = useState({})
    const { language } = useLanguage()
    const lang = language === 'se' ? se : en

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserData(userId)
                setUserData(data)
            } catch (error) {
                console.error('Error fetching user profile:', error)
            }
        }

        fetchData()
    }, [userId])

    //   const handleChangeChild = () => {
    //     localStorage.removeItem('childId');
    //     ;
    // };

    const handleChangeChild = (childId) => {
        localStorage.setItem('childId', childId)
    }

    return (
        <Container className="container">
            <LeftPanel>
                <List>
                    {userData.children &&
                        userData.children.map((child, index) => (
                            <ListItem key={index}>
                                <StyledLink
                                    to={`/childprofile/${child.id}`}
                                    onClick={() => handleChangeChild(child.id)}
                                >
                                    {child.name}
                                </StyledLink>
                            </ListItem>
                        ))}
                </List>
            </LeftPanel>
            <RightPanel>
                <ParentName>
                    {lang.welcome_user} {userData.parent_name}!
                </ParentName>
                <UserMessage>{lang.user_message}</UserMessage>
            </RightPanel>
        </Container>
    )
}

export default UserProfile

const Container = styled.div`
    /* margin: 100px; */
    display: flex;
`

const LeftPanel = styled.div`
    flex: 1;
`

const RightPanel = styled.div`
    flex: 1;
`

const ParentName = styled.p`
    font-size: 36px;
`

const UserMessage = styled.p`
    font-size: 20px;
`

const List = styled.ul`
    list-style-type: none;
    /* padding: 0; */
`

const ListItem = styled.li`
    margin-bottom: 30px;
    font-size: 36px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { fetchUserData } from '../apiService';

// const UserProfile = () => {
//     const { userId } = useParams(); // Assuming the user ID is passed as a route parameter
//     const [userData, setUserData] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await fetchUserData(userId); // Fetch user data using the userId
//                 setUserData(data);
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             }
//         };

//         fetchData();
//     }, [userId]); // Fetch data whenever userId changes

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
//                             {/* Add more child details as needed */}
//                         </li>
//                     ))}
//             </ul>
//         </div>
//     );
// };

// export default UserProfile;
