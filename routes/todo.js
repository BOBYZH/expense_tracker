const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  return res.send('List all Todo')
})

router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

router.get('/:id', authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    return res.render('detail', { todo })
  })
})

router.post('', authenticated, (req, res) => {
//  // create = new schema + save
  const todo = new Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')

    //    Todo.create({name: req.body.name})
    //    res.redirect('/')
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    return res.render('edit', { todo })
  })
})

router.put('/:id', authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
