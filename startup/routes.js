const express = require('express')
const marks = require('../routers/Marks')
const models = require('../routers/Models')
const error = require('../middleware/error')

module.exports = function (app) {
    app.use(express.json())
    app.use('/api/marks', marks)
    app.use('/api/models', models)
    app.use(error)
}