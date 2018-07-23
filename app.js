const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./services/connection');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookie = require("./services/develop");
require('./services/passport');


//import routes
const routes = require('./routes')
mongoose.Promise = global.Promise;
//plugins
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookie.cookieKey]
    })
);


mongoose.connect(config.url);
app.set('secretKey', config.secret);


//routes
app.use('/api', routes)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type , Accept , Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Controle-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
})

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
