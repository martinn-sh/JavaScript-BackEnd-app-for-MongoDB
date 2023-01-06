const validateId = require('../middleware/validateId')
const { Mark, validate } = require('../models/Mark')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const mark = await Mark.find().sort('name')
    res.send(mark)
})

router.get('/:id', validateId, async (req, res) => {
    const mark = await Mark.findById(req.params.id)

    if (!mark) return res.status(404).send('The mark with the given ID was not found.')

    res.send(mark)
})

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const mark = new Mark({
        name: req.body.name,
        abbrv: req.body.abbrv,
        manufacturer: req.body.manufacturer
    })
    await mark.save()

    res.send(mark)
})

router.put('/:id', validateId, async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const mark = await Mark.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        abbrv: req.body.abbrv,
        manufacturer: req.body.manufacturer
    }, { new: true })

    if (!mark) return res.status(404).send('The mark with the given ID was not found.')

    res.send(mark)
})

router.delete('/:id', validateId, async (req, res) => {
    const mark = await Mark.findByIdAndRemove(req.params.id)

    if (!mark) return res.status(404).send('The mark with the given ID was not found.')

    res.send(mark)
})

module.exports = router