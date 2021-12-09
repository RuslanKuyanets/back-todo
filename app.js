const express = require('express');
const todos = require('./routes/todos');

const app = express()

app.use(express.json())

app.use('/api', todos)

module.exports = app;