import { config } from 'dotenv'
import pkg from 'pg'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { request } from 'http'
import { readFileSync } from 'fs';


const { Client } = pkg

const app = express()
config()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(cors())
app.use(express.json())
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

const client = new Client({
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user: process.env.USER
})

client.connect(function (err) {
    if (err) throw err
    console.log('connected to server')
})

app.get('/accounts', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM accounts')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

app.get('/accounts/:userId', async (req, res) => {
    const { userId } = req.params
    // try {
    //     const result = await client.query('SELECT * FROM accounts WHERE id = $1', [userId]);
    //     res.json(result.rows);
    // } catch (err) {
    //     console.error(err);
    //     res.sendStatus(500);
    // }

    try {
        const parentQuery = await client.query(
            'SELECT username, parent_name FROM accounts WHERE id = $1',
            [userId]
        )

        const childrenQuery = await client.query(
            'SELECT name, date_of_birth, school, child_id, school_id FROM children WHERE parent_id = $1',
            [userId]
        )

        if (parentQuery.rows.length === 0) {
            res.status(404).send('User not found')
            return
        }

        const userData = {
            parent_name: parentQuery.rows[0].parent_name,
            children: childrenQuery.rows.map((child) => {
                const today = new Date()
                const birthDate = new Date(child.date_of_birth)
                let age = today.getFullYear() - birthDate.getFullYear()
                const monthDiff = today.getMonth() - birthDate.getMonth()
                if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                    age--
                }

                return {
                    id: child.child_id,
                    name: child.name,
                    age: age,
                    school: child.school,
                    schoolId: child.school_id
                }
            })
        }

        res.status(200).json(userData)
    } catch (error) {
        console.error('Error fetching user profile:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/accounts', async (req, res) => {
    const { username, password } = req.body
    const values = [username, password]

    const account = await client.query(
        'SELECT id, username, password FROM accounts WHERE username = $1 AND password = $2',
        values
    )

    const user = account.rows.find(
        (acc) => acc.username === username && acc.password === password
    )

    if (user) {
        // Fetch children and schools associated with the user
        const childrenQuery = await client.query(
            'SELECT child_id FROM children WHERE parent_id = $1',
            [user.id]
        )

        // const schoolsQuery = await client.query(
        //     'SELECT id FROM schools WHERE parent_id = $1',
        //     [user.id]
        // );

        const userData = {
            id: user.id,
            children: childrenQuery.rows.map((child) => child.child_id)
            // schools: schoolsQuery.rows.map(school => school.id)
        }

        res.status(200).json(userData)
    } else {
        res.status(404).send('Not found')
    }
})

// app.get('/accounts/:id', async (req, res) => {
//     const { id } = req.params

//     try {
//         const parentQuery = await client.query(
//             'SELECT username, parent_name FROM accounts WHERE id = $1',
//             [id]
//         )

//         const childrenQuery = await client.query(
//             'SELECT name, date_of_birth, school, child_id, school_id FROM children WHERE parent_id = $1',
//             [id]
//         )

//         if (parentQuery.rows.length === 0) {
//             res.status(404).send('User not found')
//             return
//         }

//         const userData = {
//             parent_name: parentQuery.rows[0].parent_name,
//             children: childrenQuery.rows.map((child) => {
//                 const today = new Date()
//                 const birthDate = new Date(child.date_of_birth)
//                 let age = today.getFullYear() - birthDate.getFullYear()
//                 const monthDiff = today.getMonth() - birthDate.getMonth()
//                 if (
//                     monthDiff < 0 ||
//                     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//                 ) {
//                     age--
//                 }

//                 return {
//                     id: child.child_id,
//                     name: child.name,
//                     age: age,
//                     school: child.school,
//                     schoolId: child.school_id
//                 }
//             })
//         }

//         res.status(200).json(userData)
//     } catch (error) {
//         console.error('Error fetching user profile:', error)
//         res.status(500).send('Internal Server Error')
//     }
// })

// app.get('/childprofile/:id', async (req, res) => {
//   const { id } = req.params;

//   try {

//       const childrenQuery = await client.query(
//           'SELECT name, date_of_birth, school, child_id FROM children WHERE child_id = $1',
//           [id]
//       );

//       const userData = {
//           children: childrenQuery.rows.map(child => {
//               const today = new Date();
//               const birthDate = new Date(child.date_of_birth);
//               let age = today.getFullYear() - birthDate.getFullYear();
//               const monthDiff = today.getMonth() - birthDate.getMonth();
//               if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//                   age--;
//               }

//               return {
//                 id: child.child_id,
//                   name: child.name,
//                   age: age,
//                   school: child.school
//               };
//           })
//       };

//       res.status(200).json(userData);
//   } catch (error) {
//       console.error('Error fetching user profile:', error);
//       res.status(500).send('Internal Server Error');
//   }
// } )

// app.get('/childprofile/:id/:schoolId', async (req, res) => {
//     const { id, schoolId } = req.params

//     try {
//         const childrenQuery = await client.query(
//             'SELECT name, date_of_birth, school, child_id, school_id FROM children WHERE child_id = $1 AND school_id = $2',
//             [id, schoolId]
//         )

//         const userData = {
//             children: childrenQuery.rows.map((child) => {
//                 const today = new Date()
//                 const birthDate = new Date(child.date_of_birth)
//                 let age = today.getFullYear() - birthDate.getFullYear()
//                 const monthDiff = today.getMonth() - birthDate.getMonth()
//                 if (
//                     monthDiff < 0 ||
//                     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//                 ) {
//                     age--
//                 }

//                 return {
//                     id: child.child_id,
//                     name: child.name,
//                     age: age,
//                     school: child.school,
//                     schoolId: child.school_id
//                 }
//             })
//         }

//         res.status(200).json(userData)
//     } catch (error) {
//         console.error('Error fetching child profile:', error)
//         res.status(500).send('Internal Server Error')
//     }
// })

app.get('/childprofile/:id', async (req, res) => {
    const { id } = req.params

    try {
        // Fetch child profile data based on the child ID
        const childrenQuery = await client.query(
            'SELECT name, date_of_birth, school, child_id, school_id FROM children WHERE child_id = $1',
            [id]
        )

        // Construct user data object
        const userData = {
            children: childrenQuery.rows.map((child) => {
                const today = new Date()
                const birthDate = new Date(child.date_of_birth)
                let age = today.getFullYear() - birthDate.getFullYear()
                const monthDiff = today.getMonth() - birthDate.getMonth()
                if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                    age--
                }

                return {
                    id: child.child_id,
                    name: child.name,
                    age: age,
                    school: child.school,
                    schoolId: child.school_id
                }
            })
        }

        res.status(200).json(userData)
    } catch (error) {
        console.error('Error fetching child profile:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/contacts/:type/:schoolId', async (req, res) => {
    const { type, schoolId } = req.params

    try {
        const query =
            'SELECT * FROM contacts WHERE type = $1 AND school_id = $2'
        const result = await client.query(query, [type, schoolId])
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching contacts:', error)
        res.sendStatus(500)
    }
})

app.get('/schedule/:childId', async (req, res) => {
    const { childId } = req.params

    try {
        const query = `
      SELECT cs.child_id, cs.day_id, cs.start_time, cs.end_time, d.day_name, cs.attending,
      cs.absence_start_time,
      cs.absence_end_time
      FROM ChildSchedule cs
      JOIN Day d ON cs.day_id = d.day_id
      WHERE cs.child_id = $1
      AND cs.day_id BETWEEN 1 AND 5; -- Monday to Friday
    `

        const { rows } = await client.query(query, [childId])
        res.json(rows)
    } catch (error) {
        console.error('Error fetching child schedule:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.put('/schedule/:childId', async (req, res) => {
    const { childId } = req.params
    const { dayId, startTime, endTime } = req.body

    console.log('Received startTime:', startTime)
    console.log('Received endTime:', endTime)
    console.log('Received request body:', req.body)

    try {
        await client.query('BEGIN')

        const updateQuery = `
      UPDATE ChildSchedule
      SET start_time = $1, end_time = $2
      WHERE child_id = $3 AND day_id = $4;
    `
        await client.query(updateQuery, [startTime, endTime, childId, dayId])

        await client.query('COMMIT')
        res.status(200).send('Schedule updated successfully')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error updating schedule:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.put('/absence/:childId', async (req, res) => {
    const { childId } = req.params
    const { attending, dayId } = req.body

    console.log('Received attending:', attending)
    console.log('Received dayId:', dayId)
    console.log('Received request body:', req.body)
    try {
        await client.query('BEGIN')

        const updateQuery = `
        UPDATE ChildSchedule
        SET attending = $1
        WHERE child_id = $2 AND day_id = $3;
    `
        await client.query(updateQuery, [attending, childId, dayId]);


        await client.query('COMMIT')
        res.status(200).send('Child marked as absent for the whole day')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error marking child as absent:', error)
        res.status(500).send('Internal Server Error')
    }
})

// app.put('/schedule/absencetime/:childId', async (req, res) => {
//     const { childId } = req.params
//     const { dayId, absenceStartTime, absenceEndTime } = req.body

//     try {
//         await client.query('BEGIN')

//         const updateQuery = `
//           UPDATE ChildSchedule
//           SET absence_start_time = $1, absence_end_time = $2
//           WHERE child_id = $3 AND day_id = $4;
//       `
//         const queryParams = [absenceStartTime, absenceEndTime, childId, dayId]

//         await client.query(updateQuery, queryParams)

//         await client.query('COMMIT')
//         res.status(200).send(
//             'Child marked as sick for the specified time range'
//         )
//     } catch (error) {
//         await client.query('ROLLBACK')
//         console.error('Error marking child as sick:', error)
//         res.status(500).send('Internal Server Error')
//     }
// })

// Requested schedules

// app.get('/weeks', async (req, res) => {
//     try {
//         const query = `
//       SELECT w.*, ARRAY_AGG(d.day_name) AS day, ARRAY_AGG(wda.attending) AS attending
//       FROM weeks w
//       JOIN week_day_association wda ON w.week_id = wda.week_id
//       JOIN day d ON wda.day_id = d.day_id
//       GROUP BY w.week_id
//     `
//         const { rows } = await client.query(query)
//         res.json(rows)
//     } catch (error) {
//         console.error('Error fetching weeks:', error)
//         res.status(500).json({ error: error.message })
//     }
// })

app.get('/weeks/:childId', async (req, res) => {
    try {
        const { childId } = req.params
        const query = `
          SELECT w.*, ARRAY_AGG(d.day_name ORDER BY d.day_number) AS day, ARRAY_AGG(wda.attending) AS attending
          FROM weeks w
          JOIN week_day_association wda ON w.week_id = wda.week_id
          JOIN day d ON wda.day_id = d.day_id
          WHERE wda.child_id = $1
          GROUP BY w.week_id
          ORDER BY MIN(d.day_id);
      `
        const { rows } = await client.query(query, [childId])
        res.json(rows)
    } catch (error) {
        console.error('Error fetching weeks:', error)
        res.status(500).json({ error: error.message })
    }
})

app.get('/week_day_association/:childId', async (req, res) => {
    const { childId } = req.params
    try {
        const query = `
      SELECT *
      FROM week_day_association WHERE child_id = $1
    `

        const { rows } = await client.query(query)

        res.json(rows)
    } catch (error) {
        console.error('Error fetching week_day_association:', error)
        res.status(500).json({ error: error.message })
    }
})

app.put('/week_day_association/:childId', async (req, res) => {
    const { childId } = req.params
    const { weekId, dayId, attending } = req.body
    console.log('Received request body:', req.body)

    try {
        console.log(
            'Updating attendance with parameters:',
            attending,
            weekId,
            dayId
        )

        await client.query(
            'UPDATE week_day_association SET attending = $1 WHERE child_id = $2 AND week_id = $3 AND day_id = $4',
            [attending, childId, weekId, dayId]
        )
        res.status(200).send('Attendance updated successfully')
    } catch (error) {
        console.error('Error updating attendance:', error.message)

        res.status(500).send('Internal Server Error')
    }
})

// funkar ovan


app.listen(8800, () => {
    console.log('server is running')
})
