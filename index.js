// const body_parser = require('body-parser')

const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://nodejs123:nodejs123@node.kjvtwn8.mongodb.net/Arab?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected successfully')
        })   

const coursesRouter = require("./routes/courses.routes")


// app.use(body_parser.json())
app.use(express.json())

app.use('/api/courses', coursesRouter)



app.listen('3001', () => console.log('listen on port 3001'))