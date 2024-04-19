import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import { LanguageProvider } from './components/language/LanguageContext'
import HomePage from './pages/homePage'
import Profile from './pages/profilePage'
import ChildProfilePage from './pages/childProfilePage'

function App() {
    return (
        <div className="App">
            <LanguageProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/childprofile/:id" element={<ChildProfilePage />} />
                    </Routes>
                </BrowserRouter>
                <NavBar />
            </LanguageProvider>
        </div>
    )
}

export default App
