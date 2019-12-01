const express = require('express')
const router = express.Router()
const Record = require('../models/record')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  return res.send('List all record')
})

router.get('/new', authenticated, (req, res) => {
  return res.render('new')
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
