import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChildSchedule = () => {
  const { childId } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [updatedTimes, setUpdatedTimes] = useState({});

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/schedule/${childId}`);
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching child schedule:', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [childId]);

  const handleTimeChange = (dayId, field, value) => {
    setUpdatedTimes((prev) => ({
      ...prev,
      [dayId]: { ...prev[dayId], [field]: value },
    }));
  };

  const handleScheduleUpdate = async (dayId) => {
    try {
      const startTime = updatedTimes[dayId]?.start_time;
      const endTime = updatedTimes[dayId]?.end_time;

      console.log('dayId:', dayId);
      console.log('startTime:', startTime);
      console.log('endTime:', endTime);
      console.log('Updated times:', updatedTimes); // Add this line for debugging

      await axios.put(`http://localhost:8800/schedule/${childId}`, { dayId, endTime, startTime });

      console.log('Schedule updated successfully');
      // Refresh schedule after update
      setUpdatedTimes({});
      fetchSchedule();
    } catch (error) {
      console.error('Error updating child schedule:', error);
    }
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <h2>Child Schedule</h2>
      <ul>
        {schedule.map((scheduleItem) => (
          <li key={scheduleItem.day_id}>
            <strong>{scheduleItem.day_name}</strong> - Time: {scheduleItem.start_time} to {scheduleItem.end_time}
            <input
              type="time"
              value={updatedTimes[scheduleItem.day_id]?.start_time || ''}
              onChange={(e) => handleTimeChange(scheduleItem.day_id, 'start_time', e.target.value)}
            />
            to
            <input
              type="time"
              value={updatedTimes[scheduleItem.day_id]?.end_time || ''}
              onChange={(e) => handleTimeChange(scheduleItem.day_id, 'end_time', e.target.value)}
            />
            <button onClick={() => handleScheduleUpdate(scheduleItem.day_id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChildSchedule;
