// import React from 'react'
// import ChildSchedule from '../components/ChildSchedule'

// const SchedulePage = () => {
//   return (
//     <div><ChildSchedule/></div>
//   )
// }

// export default SchedulePage


import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import ChildSchedule from '../components/ChildSchedule';
import ShowSchedule from '../components/ShowSchedule';
import RequestedSchedule from '../components/RequestedSchedule';

const ChangeChildScheduleWrapper = () => {
  const { childId } = useParams();

  return <ChildSchedule childId={childId} />;
};

const ShowScheduleWrapper = () => {
  const { childId } = useParams();

  return <ShowSchedule childId={childId} />;
};

const RequestedScheduleWrapper = () => {
  const { childId } = useParams();

  return <RequestedSchedule childId={childId} />;
};

const SchedulePage = () => {
  return (
    <div>
      {/* Nested routes for ChildSchedule and ShowSchedule components */}
      <Routes>
        <Route path="/change" element={<ChangeChildScheduleWrapper />} />
        <Route path="/show" element={<ShowScheduleWrapper />} />
        <Route path="/requested" element={<RequestedScheduleWrapper />} />
      </Routes>
    </div>
  );
};

export default SchedulePage;
