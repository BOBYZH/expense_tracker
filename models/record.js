const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
     validate: {
      validator: function (i) {
        return /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(i);
      },
      message: '{VALUE} is not a valid date',
      isAsync: false
    }
  },
  amount: {
    type: Number,
    min: 0,
    multipleOf: 1,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
