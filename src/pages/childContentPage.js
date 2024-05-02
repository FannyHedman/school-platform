import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import ChildProfilePage from '../pages/childProfilePage';
import ContactPage from '../pages/contactPage';
import SchedulePage from '../pages/schedulePage';
import Sidebar from '../components/SideBar';
import ChildProfile from '../components/ChildProfile';
import Contact from '../components/ContactComponent';
import ChildSchedule from '../components/ChildSchedule';
import ShowSchedule from '../components/ShowSchedule';
import RequestedSchedule from '../components/RequestedSchedule';
import ContactComponent from '../components/ContactComponent';

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

const RequestedContactWrapper = () => {
  const { type, schoolId } = useParams();
  return <ContactPage type={type} schoolId={schoolId} />; }

const ChildContentPage = () => {
  const { id, schoolId, childId } = useParams();

  return (
    <div>
      <Sidebar schoolId={schoolId} childId={childId} />
    <Routes>
      <Route path={`/childprofile/:id/:schoolId`} element={<ChildProfilePage />} />
      <Route path={`/contact/:type/:schoolId`} element={<RequestedContactWrapper />} />
      <Route path={`/schedule/:childId/*`} element={<SchedulePage childId={childId}/>} />
      {/* <Route path="/change" element={<ChangeChildScheduleWrapper />} />
        <Route path="/show" element={<ShowScheduleWrapper />} />
        <Route path="/requested/:childId" element={<RequestedScheduleWrapper childId={childId}/>} /> */}
    </Routes>
    </div>
  );
};

export default ChildContentPage;
