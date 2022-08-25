require('dotenv').config()
const express = require('express')
const app = express()
// const cors = require(cors);
const bodyParser = require('body-parser')
const cors = require('cors')

const {assertDatabaseConnection} = require('./db')
const indexRouter = require('./routes')
const { errorHandler } = require('./helpers/errorHandler')

// app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());

//DB connection
assertDatabaseConnection();

app.use('/', indexRouter)

app.use((err, req, res, next) => errorHandler(err, res, next))

app.listen(process.env.PORT, process.env.IP, ()=> {
    console.log(`Server started on port ${process.env.IP}:${process.env.PORT}...`)
})