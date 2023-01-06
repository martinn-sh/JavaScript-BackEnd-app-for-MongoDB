const Joi = require('joi')
const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    markId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mark',
        required: true
    }
})

const Model = mongoose.model('Model', modelSchema)

function validateModel(model) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        markId: Joi.objectId().required()
    })
    return schema.validate(model)
}

exports.Model = Model
exports.validate = validateModel