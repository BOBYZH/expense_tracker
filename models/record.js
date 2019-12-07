const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const manyValidators = [
  { validator: validator.isISO8601, message: '{VALUE} is not a valid date', isAsync: false },
  //        { validator: function (i) { return /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(i) }, isAsync: false  }
  { validator: validator.isBefore, msg: '{VALUE} is a future date', isAsync: false }
]

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['domestic', 'traffic', 'recreation', 'diet', 'others']
  },
  date: {
    type: String,
    required: true,
    validate: manyValidators
  },
  month: {
    type: String,
    required: true,
    validate: {
      validator: function (i) {
        return /[0-9]{2}/.test(i)
      },
      message: '{VALUE} is not a valid month',
      isAsync: false
    }
  },
  amount: {
    type: Number,
    min: 0,
    multipleOf: 1,
    required: true
  },
  merchant: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
