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
  const category = req.query.category
  const month = req.query.month
  console.log(category, month)
  let querys = {}
  if (month === "") {
    querys = { category: category, userId: req.user._id }
  } else if (category === "") {
    querys = { month: month, userId: req.user._id }
  } else {
    querys = { category: category, month: month, userId: req.user._id }
  }
  Record.find(querys)
    .sort({ date: 'desc' })
    .exec((err, records) => {
      if (err) return res.sendStatus(500)
      return res.render('index', { records, month, category })
    })
})
module.exports = router
