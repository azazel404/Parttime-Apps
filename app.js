const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//import routes
const routes = require('./api/routes')

//mongo
mongoose.connect('mongodb://andraeinstein:' + process.env.MONGO_ATLAS_PASSWORD + '@ahtefe-shard-00-00-2vogq.mongodb.net:27017,ahtefe-shard-00-01-2vogq.mongodb.net:27017,ahtefe-shard-00-02-2vogq.mongodb.net:27017/test?ssl=true&replicaSet=ahtefe-shard-0&authSource=admin')
mongoose.Promise = global.Promise

//plugins
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//CORS handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

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
