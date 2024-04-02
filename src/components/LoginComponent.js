import React from 'react'
import { useLanguage } from '../components/language/LanguageContext'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'
import styled from 'styled-components'


const LoginComponent = () => {

  const { language } = useLanguage()
    const lang = language === 'se' ? se : en

    return (
        <div style={{ marginTop: '100px' }}>
            <Container>
                <LeftDiv>
                  <LeftDivContainer><Heading>{lang.startpage_title}</Heading></LeftDivContainer>
                </LeftDiv>
                <RightDiv>
                <LoginContainer>
            <h1>Login</h1>
            <Form>
                <Label htmlFor="email">{lang.login_email}</Label>
                <Input type="email" id="email" name="email" required />
                <Label htmlFor="password">{lang.login_password}</Label>
                <Input type="password" id="password" name="password" required />
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
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
`;

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
`;