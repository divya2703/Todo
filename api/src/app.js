require('./db/db')

const express = require('express')
const cors = require("cors")
const passport = require('passport');
require('dotenv').config();

//routes
const apiRouter = require('./routers/api')
const port = process.env.PORT || 9000;
const app = express()

require('./config/passport')(passport);
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors())
app.use(apiRouter)
app.use(passport.initialize());
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

