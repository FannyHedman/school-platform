import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { fetchSchedule } from '../apiService'

const ShowSchedule = () => {

  const {childId} = useParams()
  const [showSchedule, setShowSchedule] = useState([])

  // const fetchSchedule = async () => {
  //   try { const response = await axios.get(`http://localhost:8800/schedule/${childId}`);
  // setShowSchedule(response.data)}
  // catch (error) {
  //   console.error('Error fetching child schedule:', error);
  // }}

  // useEffect(() => {
  //   fetchSchedule();

  // })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedule = await fetchSchedule(childId);
        setShowSchedule(schedule);
      } catch (error) {
        console.error('Error fetching weeks:', error);
      }
    };

    fetchData();
  }, [childId]);

  
  return (
    <div style={{marginTop: '200px'}}><h2>Show schedule</h2><div>
      <ul>{showSchedule.map((item) => (
        <li key={item.day_id}><p>{item.day_name}</p><p>{item.start_time}</p><p>{item.end_time}</p></li>
      ))}

      </ul></div></div>
  )
}

export default ShowSchedule
