const express = require('express');
const Sequelize =  require('sequelize');

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';

const port = process.env.PORT || 5000
const app = express()

app.listen(port, () => console.log(`listenining on ${port}`))

const db = new Sequelize(databaseUrl);

db.sync()
.then(()=> console.log('db synced'))
.catch(console.error)