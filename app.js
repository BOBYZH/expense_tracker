/* eslint-disable semi */
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection // 已連線的資料庫

db.on('error', () => { // on可觸發多次
  console.log('mongodb error!')
})

db.once('open', () => { // once只觸發一次
  console.log('mongodb connected!')
})

app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))

app.listen(3000, () => {
  console.log('App is listening!')
})
