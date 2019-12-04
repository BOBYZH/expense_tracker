const express = require('express')
const router = express.Router()
const Record = require('../models/record')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .sort({ date: 'desc' })
    .exec((err, records) => {
      if (err) return console.error(err)
      return res.render('index', { records })
    })
})

router.get('/filter', authenticated, (req, res) => {
  const order = req.query.order
  const category = req.query.category
  const sortObject = { category: order }
  Record.find({ category: category, userId: req.user._id })
    .sort(sortObject)
    .exec((err, records) => {
      if (err) return res.sendStatus(500)
      return res.render('index', { records })
    })
})
module.exports = router