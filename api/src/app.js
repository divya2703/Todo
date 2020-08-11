require('./db/db')

const express = require('express')
const https = require('https')
const cors = require("cors")
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');

const port = 9000
const app = express()

//routes
const apiRouter = require('./routers/api')

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors())

app.use(apiRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// //don't need in production for now using nginx
// if (process.env.APP_ENV == 'production') {
//     https.createServer(sslOptions, app).listen(httpsPort, () => {
//         console.log(`Server running on port ${httpsPort}`)
//     })
// }