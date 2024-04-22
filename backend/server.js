import { config } from 'dotenv'
import pkg from 'pg'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { request } from 'http'

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

app.post('/accounts', async (req, res) => {
    const { username, password, } = req.body
    const values = [username, password]

    const account = await client.query(
        'SELECT id, username, password FROM accounts WHERE username = $1 AND password = $2',
        values
    )

    const user = account.rows.find(
        (acc) => acc.username === username && acc.password === password
    )

    if (user) {
        res.status(200).json({ id: user.id, message: 'Logged in' })
    } else {
        res.status(404).send('Not found')
    }
})

app.get('/accounts/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const parentQuery = await client.query(
          'SELECT username, parent_name FROM accounts WHERE id = $1',
          [id]
      );


      const childrenQuery = await client.query(
          'SELECT name, date_of_birth, school, child_id, school_id FROM children WHERE parent_id = $1',
          [id]
      );


      if (parentQuery.rows.length === 0) {
          res.status(404).send('User not found');
          return;
      }


      const userData = {
          parent_name: parentQuery.rows[0].parent_name,
          children: childrenQuery.rows.map(child => {
              const today = new Date();
              const birthDate = new Date(child.date_of_birth);
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
              }

              return {
                id: child.child_id,
                  name: child.name,
                  age: age,
                  school: child.school,
                  schoolId: child.school_id
              };
          })
      };

      res.status(200).json(userData);
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send('Internal Server Error');
  }
});


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


app.get('/childprofile/:id/:schoolId', async (req, res) => {
  const { id, schoolId } = req.params;

  try {
      const childrenQuery = await client.query(
          'SELECT name, date_of_birth, school, child_id, school_id FROM children WHERE child_id = $1 AND school_id = $2',
          [id, schoolId]
      );

      const userData = {
          children: childrenQuery.rows.map(child => {
              const today = new Date();
              const birthDate = new Date(child.date_of_birth);
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
              }

              return {
                id: child.child_id,
                  name: child.name,
                  age: age,
                  school: child.school,
                  schoolId: child.school_id
              };
          })
      };

      res.status(200).json(userData);
  } catch (error) {
      console.error('Error fetching child profile:', error);
      res.status(500).send('Internal Server Error');
  }
});



app.get('/contacts/:type/:childId/:schoolId', async (req, res) => {
  const { type, childId, schoolId } = req.params;

  try {
      let query;
      switch (type) {
          case 'teacher':
          case 'management':
          case 'health':
          case 'parent':
              query = 'SELECT * FROM contacts WHERE type = $1 AND child_id = $2 AND school_id = $3';
              break;
          default:
              return res.status(400).json({ message: 'Invalid contact type' });
      }

      const result = await client.query(query, [type, childId, schoolId]);
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching contacts:', error);
      res.sendStatus(500);
  }
});


// funkar ovan






// app.get('/accounts/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//       // Fetch parent data
//       const parentQuery = await client.query(
//           'SELECT username, parent_name FROM accounts WHERE id = $1',
//           [id]
//       );

//       // Fetch children data including name, date of birth, and school
//       const childrenQuery = await client.query(
//           'SELECT id, name, date_of_birth, school FROM children WHERE parent_id = $1',
//           [id]
//       );

//       if (parentQuery.rows.length === 0) {
//           res.status(404).send('User not found');
//           return;
//       }

//       // Fetch schedules for each child
//       const childrenWithSchedules = await Promise.all(childrenQuery.rows.map(async (child) => {
//           const scheduleQuery = await client.query(
//               'SELECT day_of_week, start_time, end_time FROM child_schedules WHERE child_id = $1',
//               [child.id]
//           );
//           return {
//               ...child,
//               schedule: scheduleQuery.rows
//           };
//       }));

//       const userData = {
//           parent_name: parentQuery.rows[0].parent_name,
//           children: childrenWithSchedules.map(child => {
//               // Calculate age based on date of birth
//               const today = new Date();
//               const birthDate = new Date(child.date_of_birth);
//               let age = today.getFullYear() - birthDate.getFullYear();
//               const monthDiff = today.getMonth() - birthDate.getMonth();
//               if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//                   age--;
//               }

//               return {
//                   name: child.name,
//                   age: age,
//                   school: child.school,
//                   schedule: child.schedule
//               };
//           })
//       };

//       res.status(200).json(userData);
//   } catch (error) {
//       console.error('Error fetching user profile:', error);
//       res.status(500).send('Internal Server Error');
//   }
// });


app.listen(8800, () => {
    console.log('server is running')
})
