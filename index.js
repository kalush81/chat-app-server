const express = require('express');
const Sequelize =  require('sequelize');
const bodyParser = require('body-parser');

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';

const port = process.env.PORT || 5000


const db = new Sequelize(databaseUrl);
const jsonBody =  bodyParser.json()
const app = express()
app.use(jsonBody);

app.listen(port, () => console.log(`listenining on ${port}`))

const Chatroom = db.define('chatroom', {
    message: Sequelize.STRING,
    user: Sequelize.STRING
})

db.sync()
.then(()=> console.log('db synced'))
.catch(console.error)

app.get('/', (req, res) => {
    console.log('got an get request on /')
    res.status(200)
    res.send('hello world')
}) 

app.post('/message', (req, res) => {
    console.log('got req on /message', req.body);
    const { message } = req.body
    const entity = Chatroom.create({
        message,
        user: 'it s me'
    })
    res.status(200)
    res.send('thanks for your message')
})