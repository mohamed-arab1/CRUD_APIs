const body_parser = require('body-parser')
const express = require('express');
const app = express();
const coursesRouter = require("./routes/courses.routes")


// app.use(body_parser.json())
app.use(express.json())

app.use('/api/courses', coursesRouter)



app.listen('3001', () => console.log('listen on port 3001'))