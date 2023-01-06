const mongoose = require('mongoose')

module.exports = function () {
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb://127.0.0.1:27017/DataBase')
        .then(() => console.log('Connected to MongoDB..'))
        .catch(err => console.error(`Failed to connec to MongoDB: ${err}`))
}