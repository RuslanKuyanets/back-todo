const express = require('express');
const cors = require('cors')
const todos = require('./routes/todos');

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', todos)

module.exports = app;