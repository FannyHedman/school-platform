import React, { useState } from 'react'
import { useLanguage } from '../components/language/LanguageContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'
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
    const navigate=useNavigate()

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

            const id = response.data.id
            navigate(`/profile/${id}`)
            console.log('logged in successfully')
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <Container>
                <LeftDiv>
                    <LeftDivContainer>
                        <Heading>{lang.startpage_title}</Heading>
                    </LeftDivContainer>
                </LeftDiv>
                <RightDiv>
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
                </RightDiv>
            </Container>
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
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    text-align: center;
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
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`
