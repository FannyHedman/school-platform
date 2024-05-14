// // import React from 'react'
// // import ChildSchedule from '../components/ChildSchedule'

// // const SchedulePage = () => {
// //   return (
// //     <div><ChildSchedule/></div>
// //   )
// // }

// // export default SchedulePage

// import React from 'react';
// import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
// import ChildSchedule from '../components/ChildSchedule';
// import ShowSchedule from '../components/ShowSchedule';
// import RequestedSchedule from '../components/RequestedSchedule';

// const ChangeChildScheduleWrapper = () => {
//   const { childId } = useParams();

//   return <ChildSchedule childId={childId} />;
// };

// const ShowScheduleWrapper = () => {
//   const { childId } = useParams();

//   return <ShowSchedule childId={childId} />;
// };

// const RequestedScheduleWrapper = () => {
//   const { childId } = useParams();

//   return <RequestedSchedule childId={childId} />;
// };

// const SchedulePage = () => {
//   const navigate = useNavigate(); // Import useNavigate from react-router-dom

//   // Function to handle the back button click
//   const handleBack = () => {
//     navigate(-1); // Go back to the previous page
//   };
//   return (
//     <div>
//       <button style={{marginTop: '200px'}} onClick={handleBack}>Back</button> {/* Back button */}
//       {/* Nested routes for ChildSchedule and ShowSchedule components */}
//       <Routes>
//         <Route path="/change" element={<ChangeChildScheduleWrapper />} />
//         <Route path="/show" element={<ShowScheduleWrapper />} />
//         <Route path="/requested/:childId" element={<RequestedScheduleWrapper />} />
//       </Routes>
//     </div>
//   );
// };

// export default SchedulePage;

import React from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import ChildSchedule from '../components/schedules/ChildSchedule'
import ShowSchedule from '../components/schedules/ShowSchedule'
import RequestedSchedule from '../components/schedules/RequestedSchedule'

const SchedulePage = () => {
    const { childId } = useParams()
    const navigate = useNavigate() // Import useNavigate from react-router-dom

    // Function to handle the back button click
    const handleBack = () => {
        navigate(-1) // Go back to the previous page
    }

    return (
        <div>
            <button style={{ marginTop: '200px' }} onClick={handleBack}>
                Back
            </button>{' '}
            {/* Back button */}
            {/* Nested routes for ChildSchedule and ShowSchedule components */}
            <Routes>
                {/* Pass childId as a prop to the ChildSchedule component */}
                <Route
                    path="change"
                    element={<ChildSchedule childId={childId} />}
                />
                {/* Pass childId as a prop to the ShowSchedule component */}
                <Route
                    path="show"
                    element={<ShowSchedule childId={childId} />}
                />
                {/* Pass childId as a prop to the RequestedSchedule component */}
                <Route
                    path="requested"
                    element={<RequestedSchedule childId={childId} />}
                />
            </Routes>
        </div>
    )
}

export default SchedulePage
