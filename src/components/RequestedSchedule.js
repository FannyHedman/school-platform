import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ConfirmationModalReq from './ConfirmationModalReq';

const RequestedSchedule = () => {
  const [weeks, setWeeks] = useState([]);
  const [selectedDays, setSelectedDays] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { childId } = useParams();

useEffect(() => {
  const fetchWeeks = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/weeks/${childId}`);
      const sortedWeeks = response.data.map((week) => ({
        ...week,
        day: week.day.sort((a, b) => {
          const dayOrder = {
            'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Friday': 5
          };
          return dayOrder[a] - dayOrder[b];
        })
      })).sort((a, b) => a.week_number - b.week_number);

      setWeeks(sortedWeeks);
    } catch (error) {
      console.error('Error fetching weeks:', error);
    }
  };

  fetchWeeks();
}, [childId]);


  const handleWeekToggle = (weekId) => {
    setSelectedDays((prev) => {
      const allSelected = !prev[weekId]?.all;
      const updatedWeek = { all: allSelected };

      for (const day of weeks.find((week) => week.week_id === weekId)?.day) {
        updatedWeek[day] = allSelected;
      }

      return { ...prev, [weekId]: updatedWeek };
    });
  };



  const handleDayToggle = (weekId, day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [weekId]: { ...(prev[weekId] || {}), [day]: !prev[weekId]?.[day] },
    }));
  };


const getDayIdFromName = (dayName) => {
  const dayIdMap = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5
  };

  return dayIdMap[dayName];
};


  const handleSubmit = async () => {
    try {
      for (const [weekId, weekData] of Object.entries(selectedDays)) {
        for (const [dayId, attending] of Object.entries(weekData)) {

          const dayIdFromDB = getDayIdFromName(dayId);
          const data = {
            weekId,
            dayId: dayIdFromDB,
            attending
          };

          const response = await axios.put(`http://localhost:8800/week_day_association/${childId}`, data);
          console.log(`Attendance for Child ${childId} Week ${weekId}, Day ${dayId} submitted successfully:`, response.data);
        }
      }
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting selected days:', error);
    }
  };



  return (
    <div style={{ marginTop: '200px' }}>
      <h2>Weeks</h2>
      <ul>
        {weeks.map((week) => (
          <li key={week.week_id}>
            <input
              type="checkbox"
              checked={selectedDays[week.week_id]?.all}
              onChange={() => handleWeekToggle(week.week_id)}
              disabled={showModal}
            />
            Week {week.week_number}: {week.start_date} to {week.end_date}
            <ul>
              {week.day &&
                week.day.map((day) => (
                  <li key={day}>
                    <input
                      type="checkbox"
                      checked={selectedDays[week.week_id]?.[day]}
                      onChange={() => handleDayToggle(week.week_id, day)}
                      disabled={showModal}
                    />
                    {day}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
      {showModal && <ConfirmationModalReq handleClose={() => setShowModal(false)} />}
    </div>
  );
};

export default RequestedSchedule;
