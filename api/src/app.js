require('./db/db')

const express = require('express')
const https = require('https')
const cors = require("cors")
const fs = require('fs')
const path = require('path')
const passport = require('passport');
//routes
const apiRouter = require('./routers/api')

const port = 9000
const app = express()

require('dotenv').config();
require('./config/passport')(passport);


app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors())
app.use(apiRouter)
app.use(passport.initialize());

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

