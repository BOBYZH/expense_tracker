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
  let mm = date.getMonth() + 1 //January is 0!
  let yyyy = date.getFullYear()
  if (dd < 10) {
      dd = '0'+dd
  } 
  if (mm < 10) {
      mm = '0'+mm
  }
  date = yyyy + '-' + mm + '-' + dd
//  console.log(date)
  return res.render('new', { date })
})

router.get('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    return res.render('detail', { record: todo })
  })
})

router.post('/', authenticated, (req, res) => {
//  // create = new schema + save
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

    //    record.create({name: req.body.name})
    //    res.redirect('/')
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: todo })
  })
})

router.put('/:id', authenticated, (req, res) => {
  record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    if (req.body.done === 'on') {
      record.done = true
    } else {
      record.done = false
    }
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/records/${req.params.id}`)
    })
  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
