'use strict';

module.exports = () => {
    const express = require('express')
    const app = express()
    app.use('/library', express.static('../library'))

    return app;
}