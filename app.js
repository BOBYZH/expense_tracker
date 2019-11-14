const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection //已連線的資料庫

db.on('error', () => { //on可觸發多次
  console.log('mongodb error!')
})

db.once('open', () => { //once只觸發一次
  console.log('mongodb connected!')
})

const Todo = require('./models/todo')

app.get('/', (req, res) => {
  res.send("Hello world, Node.js!")
})

app.get('/todos', (req, res) => {
  res.send('List all Todos.')
})

app.get('/todos/new', (req, res) => {
  res.send('Page of creating a Todo.')
})

app.get('/todos/:id', (req, res) => {
  res.send('Display the detail of Todo.')
})

app.post('/todos', (req, res) => {
  res.send('Create a Todo')
})

app.get('/todos/:id/edit', (req, res) => {
  res.send('Page of editing a Todo.')
})

app.post('/todos/:id/edit', (req, res) => {
  res.send('Edit a Todo.')
})

app.post('/todos/:id/delete', (req, res) => {
  res.send('Delete a Todo.')
})

app.listen(3000, () => {
  console.log("App is listening!")
})