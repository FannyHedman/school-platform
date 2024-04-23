import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChildSchedule = () => {
  const { childId } = useParams();
  const [childSchedule, setChildSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/schedule/${childId}`);
        setChildSchedule(response.data);
      } catch (error) {
        console.error('Error fetching child schedule:', error);
      }
    };

    fetchSchedule();
  }, [childId]);

  return (
    <div style={{ marginTop: '100px' }}>
      <h2>Child Schedule</h2>
      <ul>
        {childSchedule.map((scheduleItem, index) => (
          <li key={index}>
            <strong>Day: {scheduleItem.day_name}</strong> - Time: {scheduleItem.start_time} to {scheduleItem.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChildSchedule;
