const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

//import routes
const routes = require('./routes')

//plugins
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

//routes
app.use(routes)

//error handling page / middleware
app.use((req,res,next) => {
    const err = new Error('not found')
    err.status = 404
    next(err)
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
})

module.exports = app
