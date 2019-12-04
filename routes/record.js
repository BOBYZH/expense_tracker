const express = require('express')
const router = express.Router()
const Record = require('../models/record')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  return res.send('List all record')
})

router.get('/new', authenticated, (req, res) => {
  // adept Adam Beer's JS code from: https://teamtreehouse.com/community/html-input-date-field-how-to-set-default-value-to-todays-date
  let date = new Date()
  let dd = date.getDate()
  let mm = date.getMonth() + 1 // January is 0!
  const yyyy = date.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  date = yyyy + '-' + mm + '-' + dd
  //  console.log(date)
  return res.render('new', { date })
})

router.post('/', authenticated, (req, res) => {
  const record = new Record({    
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    userId: req.user._id
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record })
  })
})

router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/`)
    })
  })
})

router.delete('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
