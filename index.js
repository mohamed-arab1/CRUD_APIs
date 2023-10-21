// const body_parser = require('body-parser')
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('node:path')
const mongoose = require('mongoose');

const uri = process.env.MONGO_URL;

mongoose
    .connect(uri)
    .then(() => {
        console.log('connected successfully')
        })   

const coursesRouter = require("./routes/courses.routes")
const userRouter = require("./routes/users.routes")

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors())

// app.use(body_parser.json())
app.use(express.json())

app.use('/api/courses', coursesRouter)
app.use('/api/users', userRouter)

app.all('*', (req, res, next) => {
    return res.status(404).json({status: 'error', message: 'This resource is not available'})
})

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({status: err.statusText || 'error', message: err.message, code: err.statusCode || 500, data: null})
})


app.listen('3001', () => console.log('listen on port 3001'))