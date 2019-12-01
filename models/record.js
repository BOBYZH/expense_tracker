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
    type: Date,
    default: Date.now
  }
  amount: {
    type: Number,
    required: true,
      validator: validator.isCurrency,
      message: '{VALUE} is not a valid amount',
      isAsync: false
    }
  },
  totalAmount: {
    type: Number,
    required: true,
      validator: validator.isCurrency,
      message: '{VALUE} is not a valid total amount',
      isAsync: false
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', todoSchema)
