'use strict';

module.exports = () => {
    const cors = require('cors')
    const cookieParser = require('cookie-parser')
    const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const mongoose = require('mongoose')
    const client = require('./client')
    const server = require('./server')

    var whitelist = ['http://localhost:8080', 'http://shigure.myanime.co:8080']
    var corsOptions = function (req, callback) {
        var options;
        if (whitelist.indexOf(req.header('Origin')) !== -1) {
            options = { origin: true } // reflect (enable) the requested origin in the CORS response
        } else {
            options = { origin: false } // disable CORS for this request
        }
        callback(null, options) // callback expects two parameters: error and options
    }


    mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })

    mongoose.connection.on('connected', function () {
        console.log('Mongoose successfully connected.')
    })

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err)
    })

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose was disconnected')
    })

    mongoose.set('useFindAndModify', false);

    // App Use
    // io.on('connection', function (socket) {
    //     console.log('connected');
    // });
    app.use(cors(corsOptions))
    app.use(cookieParser(process.env.COOKIE_SECRET))
    app.use('/library', express.static('../library'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/api', client)
    app.use('/api/server', server)

    app.use((err, req, res, next) => {
        if (err) {
            return res.status(403).send({ success: false, error: err.message })
        }
        next()
    })

    return app;
}