import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/navigation/Navbar'
import { LanguageProvider } from './components/language/LanguageContext'
import HomePage from './pages/homePage'
import Profile from './pages/profilePage'
import ChildProfilePage from './pages/childProfilePage'
import ContactPage from './pages/contactPage'
import SchedulePage from './pages/schedulePage'
import ShowSchedule from './components/schedules/ShowSchedule'
import ChildSchedule from './components/schedules/ChildSchedule'
import RequestedSchedule from './components/schedules/RequestedSchedule'
import ContactComponent from './components/contact/ContactComponent'
import CustomerServicePage from './pages/customerServicePage'
import UserContactDetails from './components/myPage/UserContactDetails'
import { useEffect, useState } from 'react'
import Sidebar from './components/navigation/SideBar'
import ReportAbsence from './components/absence/ReportAbsence'
import LunchMenu from './components/information/LunchMenu'
import UserProfile from './components/profiles/UserProfile'
// import NewsLetter from './components/news/NewsLetter'

function App() {
    const [userId, setUserId] = useState('')
    const [childIds, setChildIds] = useState([])
    const [schoolId, setSchoolId] = useState('')
    const [childId, setChildId] = useState('')
    // const [token, setToken] = useState('')
    // sessionStorage.removeItem('token')


    // const token = localStorage.getItem('token')
    // const userToken = sessionStorage.getItem('userToken')

    useEffect(() => {

        const storedId = localStorage.getItem('userId')
        const storedChildIds = localStorage.getItem('childIds')
        // const storedSchoolId = localStorage.getItem('schoolId')
        const storedChildId = localStorage.getItem('childId')
        // const storedToken = sessionStorage.getItem('token')

        console.log('Stored User ID:', storedId);
        console.log('Stored Child IDs:', storedChildIds);
        // console.log('Stored School ID:', storedSchoolId);
        console.log('Stored Child ID:', storedChildId);
        // console.log('Stored Token:', storedToken);

        setUserId(storedId)
        setChildIds(storedChildIds ? JSON.parse(storedChildIds) : [])
        // setSchoolId(storedSchoolId)
        setChildId(storedChildId)
        // setToken(storedToken)
    }, [])
    return (
        <div className="App">
            <LanguageProvider>
                <BrowserRouter>
                    <NavBar userId={userId} />
                    <Sidebar
                        userId={userId}
                        childIds={childIds}
                        schoolId={schoolId}
                    />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/customer-service"
                            element={<CustomerServicePage />}
                        />
                        <Route
                            path="/profile/:userId"
                            element={<UserProfile childId={childId} />}
                        />
                        <Route path="/profile" element={<Profile childId={childId} />} />

                        <Route
                            path="/usercontact/:userId"
                            element={<UserContactDetails />}
                        />
                        <Route
                            path="/childprofile/:id"
                            element={<ChildProfilePage />}
                        />
                        <Route
                            path="/contact/:type/:childId"
                            element={<ContactComponent />}
                        />
                        {/* <Route path="/schedule/:childId/*" element={<SchedulePage />} /> */}
                        <Route
                            path="/show/:childId"
                            element={<ShowSchedule />}
                        />
                        <Route
                            path="/change/:childId"
                            element={<ChildSchedule />}
                        />
                        <Route
                            path="/requested/:childId"
                            element={<RequestedSchedule />}
                        />
                        <Route path="/absence/:childId" element={<ReportAbsence/>}/>
                        <Route path="/lunch_menu" element={<LunchMenu/>}/>
                        {/* <Route path="/weekly" element={NewsLetter}/> */}
                    </Routes>
                </BrowserRouter>
                {/* <NavBar /> */}
            </LanguageProvider>
        </div>
    )
}

export default App
