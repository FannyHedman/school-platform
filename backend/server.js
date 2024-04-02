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
        res.status(200).json({ id: user.id, message: 'Logged in' })
    } else {
        res.status(404).send('Not found')
    }
})

app.get('/accounts/:id', async (req, res) => {
    const { id } = req.params

    try {
        const account = await client.query(
            'SELECT name, age, interest FROM accounts WHERE id = $1',
            [id]
        )
        if (account.rows.length === 0) {
            res.status(404).send('Not found')
            return
        }

        const { name, age, interest } = account.rows[0]
        res.status(200).json({ name, age, interest })
    } catch (error) {
        console.error(error)
        res.status(500)
    }
})

app.get('/accounts/:id/messages', async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const account = await client.query(
            'SELECT * FROM accounts WHERE id NOT IN $1',
            [id]
        )
        if (account.rows.length === 0) {
            res.status(404).send('Not found')
            return
        }

        const name = account.rows[0].name
        res.status(200).json({ name })
    } catch (error) {
        console.error(error)
        res.status(500)
    }
})

app.listen(8800, () => {
    console.log('server is running')
})
