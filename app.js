/* eslint-disable semi */
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// get user info
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection // 已連線的資料庫

db.on('error', () => { // on可觸發多次
  console.log('mongodb error!')
})

db.once('open', () => { // once只觸發一次
  console.log('mongodb connected!')
})

app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/user'))

app.listen(3000, () => {
  console.log('App is listening!')
})
