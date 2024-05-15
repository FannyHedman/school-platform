import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutComponent = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('childId')
    localStorage.removeItem('childIds')
    sessionStorage.removeItem('token')
    navigate('/') 
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutComponent
