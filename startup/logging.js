const winston = require('winston')
require('express-async-errors')

module.exports = function () {
    winston.add(
        new winston.transports.File({
            filename: 'logfile.log'
        })
    )


    winston.add(
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        }),
        new winston.transports.File({
            filename: 'uncaughtExceptions.log',
            handleExceptions: true
        })
    )
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, function () {
            process.exit(1)
        })
    })


    winston.add(
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        }),
        new winston.transports.File({
            filename: 'unhandledRejections.log',
            handleRejections: true,
        })
    )
    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, function () {
            process.exit(1)
        })
    })
}