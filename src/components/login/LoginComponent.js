import React, { useState } from 'react'
import { useLanguage } from '../language/LanguageContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import en from '../language/languages/EN.json'
import se from '../language/languages/SE.json'
import styled from 'styled-components'

const LoginComponent = () => {
    const { language } = useLanguage()
    const lang = language === 'se' ? se : en

    const [account, setAccount] = useState({
        id: '',
        username: '',
        password: ''
    })

    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `http://localhost:8800/accounts`,
                account
            )

            // const id = response.data.id
            // navigate(`/profile/${id}`)
            // console.log('logged in successfully')
            // const userId = response.data.id
            // const childIds = response.data.children
            const userId = response.data.userData.id
            const childIds = response.data.userData.children
            localStorage.setItem('userId', userId) // Store user ID securely
            localStorage.setItem('childIds', JSON.stringify(childIds))
            const token = response.data.token
            sessionStorage.removeItem('token')
            sessionStorage.setItem('token', token)

            console.log('User ID:', userId)
            console.log('Child IDs:', childIds)
            console.log('Token:', token)

            // navigate(`/profile/${userId}`)
            navigate('/profile')
            console.log('logged in successfully')
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    return (
        <div>
            {/* <Container> */}
                {/* <LeftDiv>
                    <LeftDivContainer>
                        <Heading>{lang.startpage_title}</Heading>
                    </LeftDivContainer>
                </LeftDiv> */}
                {/* <RightDiv> */}
                    <LoginContainer>
                        <h1>Login</h1>
                        <Form onSubmit={handleSubmit}>
                            <Label htmlFor="email">{lang.login_email}</Label>
                            <Input
                                onChange={handleChange}
                                type="text"
                                id="username"
                                name="username"
                                required
                            />
                            <Label htmlFor="password">
                                {lang.login_password}
                            </Label>
                            <Input
                                onChange={handleChange}
                                type="password"
                                id="password"
                                name="password"
                                required
                            />
                            <Button type="submit">{lang.login_login}</Button>
                        </Form>
                    </LoginContainer>
                {/* </RightDiv> */}
            {/* </Container> */}
        </div>
    )
}

export default LoginComponent

const Container = styled.div`
    display: flex; /* Use flexbox */
    justify-content: space-between; /* Align children to start and end */
`
const RightDiv = styled.div`
    width: 50%;
    height: 100vh;
    background-color: #f9eeab;
`
const LeftDiv = styled.div`
    width: 50%;
    height: 100vh;
    background-color: pink;
`

const LeftDivContainer = styled.div``

const Heading = styled.h1``

const LoginContainer = styled.div`
    width: 300px;
    margin: 100px auto;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    text-align: center;
    /* position: relative; */
  /* z-index: 1; */
  /* margin-top: 65%; */
  width: 200px;
  /* margin-left: -28%; */
  /* height: 150px; */
  background-color: white;
  /* border: 4px solid #99c3ff; */
  border: 2px solid pink;
  border-radius: 5px;
  /* box-shadow: 10px 10px 7px -5px rgba(0, 0, 0, 0.3); */
  /* box-shadow: 5px 5px 0px #b0d0ff, 10px 10px 0px #c0daff; */
  box-shadow: 6px 6px 0px red;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  /* Ipad */
  @media (max-width: 1024px) {
    margin-top: 50%;
    width: 200px;
    margin-left: -12%;
    height: 250px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    margin-left: 30%;
    margin-top: 10%;
  }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 5px;
`

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
`

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: lightpink;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: pink;
    }
`
