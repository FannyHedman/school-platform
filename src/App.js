import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import { LanguageProvider } from './components/language/LanguageContext'
import HomePage from './pages/homePage'
import Profile from './pages/profilePage'
import ChildProfilePage from './pages/childProfilePage'
import ContactPage from './pages/contactPage'
import SchedulePage from './pages/schedulePage'
import ShowSchedule from './components/ShowSchedule'
import ChildSchedule from './components/ChildSchedule'
import RequestedSchedule from './components/RequestedSchedule'
import ContactComponent from './components/ContactComponent'
import CustomerServicePage from './pages/customerServicePage'
import UserContactDetails from './components/myPage/UserContactDetails'
import { useEffect, useState } from 'react'
import Sidebar from './components/SideBar'

function App() {

  const [userId, setUserId] = useState('');
  const [childIds, setChildIds] = useState([]);
  const [schoolId, setSchoolId] = useState('');
  const [childId, setChildId] = useState('');


  useEffect(() => {
        const storedId = localStorage.getItem('userId');
        const storedChildIds = localStorage.getItem('childIds');
        const storedSchoolId = localStorage.getItem('schoolId');
        const storedChildId = localStorage.getItem('childId');

    setUserId(storedId);
    setChildIds(storedChildIds ? JSON.parse(storedChildIds) : []);
    setSchoolId(storedSchoolId);
    setChildId(storedChildId);

  }, []);
    return (
        <div className="App">
            <LanguageProvider>
                <BrowserRouter>
                <NavBar userId={userId}/>
                <Sidebar userId={userId} childIds={childIds} schoolId={schoolId}/>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/customer-service" element={<CustomerServicePage />} />
                        <Route path="/profile/:userId" element={<Profile childId={childId}/>} />
                        <Route path="/usercontact/:userId" element={<UserContactDetails />} />
                        <Route path="/childprofile/:id" element={<ChildProfilePage />} />
                        <Route path="/contact/:type/:childId" element={<ContactComponent />} />
                        {/* <Route path="/schedule/:childId/*" element={<SchedulePage />} /> */}
                        <Route path="/show/:childId" element={<ShowSchedule />} />
                        <Route path="/change/:childId" element={<ChildSchedule/>} />
                        <Route path="/requested/:childId" element={<RequestedSchedule/>} />
                    </Routes>
                </BrowserRouter>
                {/* <NavBar /> */}
            </LanguageProvider>
        </div>
    )
}

export default App
