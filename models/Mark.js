const Joi = require('joi')
const mongoose = require('mongoose')

const markSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    abbrv: {
        type: String,
        minlength: 1,
        maxlength: 10
    },
    manufacturer: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    }
})

const Mark = mongoose.model('Mark', markSchema)

function validateMark(mark) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        abbrv: Joi.string().min(1).max(10),
        manufacturer: Joi.string().min(2).max(20).required()
    })
    return schema.validate(mark)
}

exports.Mark = Mark
exports.validate = validateMark