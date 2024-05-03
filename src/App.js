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

function App() {
    return (
        <div className="App">
            <LanguageProvider>
                <BrowserRouter>
                <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/customer-service" element={<CustomerServicePage />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/childprofile/:id/:schoolId" element={<ChildProfilePage />} />
                        <Route path="/contact/:type/:schoolId/:childId" element={<ContactComponent />} />
                        {/* <Route path="/schedule/:childId/*" element={<SchedulePage />} /> */}
                        <Route path="/show/:childId/:schoolId" element={<ShowSchedule />} />
                        <Route path="/change/:childId/:schoolId" element={<ChildSchedule />} />
                        <Route path="/requested/:childId/:schoolId" element={<RequestedSchedule />} />

                    </Routes>
                </BrowserRouter>
                {/* <NavBar /> */}
            </LanguageProvider>
        </div>
    )
}

export default App
