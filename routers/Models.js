const validateId = require('../middleware/validateId')
const { Model, validate } = require('../models/Model')
const { Mark } = require('../models/Mark')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const model = await Model.find().populate('markId')
    res.send(model)
})

router.get('/:id', validateId, async (req, res) => {
    const model = await Model.findById(req.params.id).populate('markId')

    if (!model) return res.status(404).send('The model with the given ID was not found.')

    res.send(model)
})

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const mark = await Mark.findById(req.body.markId)
    if (!mark) return res.status(400).send('Invalid mark.')

    const model = new Model({
        name: req.body.name,
        markId: req.body.markId
    })
    await model.save()

    res.send({ model, mark })
})

router.put('/:id', validateId, async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const mark = await Mark.findById(req.body.markId)
    if (!mark) return res.status(400).send('Invalid mark.')

    const model = await Model.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        markId: req.body.markId
    }, { new: true })

    if (!model) return res.status(404).send('The model with the given ID was not found.')

    res.send({ model, mark })
})

router.delete('/:id', validateId, async (req, res) => {
    const model = await Model.findByIdAndRemove(req.params.id)

    if (!model) return res.status(404).send('The model with the given ID was not found.')

    res.send(model)
})

module.exports = router