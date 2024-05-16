// import React from 'react'
// import styled from 'styled-components'
// import LoginComponent from '../components/login/LoginComponent'

// const HomePage = () => {
//     return (
//       <div className="start-page">
//         <Container>
//             <Paragraph>Allt skolrelaterat på ett ställe</Paragraph>
//             {/* <LoginComponent /> */}
//         </Container>
//         </div>
//     )
// }

// export default HomePage

// // Define a styled component for the container
// const Container = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 20px;
//     margin: 0 200px; /* Add margin to the left and right */
// `

// // Define a styled component for the paragraph
// const Paragraph = styled.p`
//     /* Add any additional styling for the paragraph */
// `

import React from 'react'
import styled from 'styled-components'
import LoginComponent from '../components/login/LoginComponent'
import { useLanguage } from '../../src/components/language/LanguageContext'
import en from '../../src/components/language/languages/EN.json'
import se from '../../src/components/language/languages/SE.json'

const HomePage = () => {

  const {language} = useLanguage();
  const lang = language === 'se' ? se : en;

    return (
        <div className="start-page">
            <Container>
                <Paragraph>{lang.startpage_title}</Paragraph>
                <LoginComponent />
            </Container>
        </div>
    )
}

export default HomePage

// Define a styled component for the container
const Container = styled.div`
    display: flex;
    justify-content: flex-end; /* Align children to the right */
    align-items: center; /* Center vertically */
    padding: 20px;
    margin: 0 200px; /* Add margin to the left and right */
    height: 100vh; /* Set the height of the container to full viewport height */
`

// Define a styled component for the paragraph
const Paragraph = styled.p`
    /* Add any additional styling for the paragraph */
`
