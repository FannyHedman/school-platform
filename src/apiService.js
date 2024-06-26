import axios from 'axios'

const baseURL = 'http://localhost:8800' // Assuming your backend server is running locally on port 8800

const jsonBaseURL = 'http://localhost:3000';

const apiService = axios.create({
    baseURL
})

export const jsonService = axios.create({
  jsonBaseURL
});

// export const fetchUserData = async (userId) => {
//     try {
//       const token = localStorage.getItem('token')
//       console.log('User ID (fetchUserData):', userId);
//       console.log('Token (fetchUserData):', token);
//         const response = await apiService.get(`/accounts/${userId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching user data:', error)
//         throw error
//     }
// }

export const fetchUserData = async (token) => {
  try {
    const response = await apiService.get(`/my-account`, { // Update the URL here
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}


// export const fetchChildProfile = async (childId, schoolId) => {
//     try {
//         const response = await apiService.get(
//             `/childprofile/${childId}/${schoolId}`
//         )
//         return response.data

//     } catch (error) {
//         console.error('Error fetching child profile:', error)
//         throw error // Propagate the error to the caller
//     }
// }

export const fetchChildProfile = async (childId) => {
  try {
      const response = await apiService.get(`/childprofile/${childId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching child profile:', error);
      throw error;
  }
};


export const fetchContacts = async (type, schoolId) => {
    try {
        const response = await apiService.get(`/contacts/${type}/${schoolId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching contacts:', error)
        throw error
    }
}

export const fetchWeeks = async (childId) => {
    try {
        const response = await apiService.get(`/weeks/${childId}`)
        const sortedWeeks = response.data.map((week) => ({
            ...week,
            day: week.day.sort((a, b) => {
                const dayOrder = {
                    Monday: 1,
                    Tuesday: 2,
                    Wednesday: 3,
                    Thursday: 4,
                    Friday: 5
                }
                return dayOrder[a] - dayOrder[b]
            })
        })).sort((a, b) => a.week_number - b.week_number)

        return sortedWeeks
    } catch (error) {
        console.error('Error fetching weeks:', error)
        throw error
    }
}

export const fetchSchedule = async (childId) => {
    try {
        const response = await apiService.get(`/schedule/${childId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching show schedule:', error)
        throw error
    }
}

export const updateSchedule = async (childId, dayId, startTime, endTime) => {
  try {
      await apiService.put(`/schedule/${childId}`, { dayId, startTime, endTime });
      console.log('Schedule updated successfully');
  } catch (error) {
      console.error('Error updating child schedule:', error);
      throw error;
  }
};


export const reportAbsenceAllDay = async (childId, attending, dayId) => {
  try {
    await apiService.put(`/absence/${childId}`, { attending, dayId })
    console.log('Absence reported successfully')
  } catch (error) {
    console.error('Error reporting absence:', error)
    throw error
  }
}

export const fetchMeals = async () => {
  try {
    const response = await jsonService.get('/meals.json')
    return response.data
  }
  catch (error) {
    console.error('Error fetching meals:', error)
    throw error
  }
}


export default apiService
