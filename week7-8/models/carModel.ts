import Review from "./reviewModel";

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
    minLength: 5,
  },
  year: Number,
  price: Number,
  color: {
    type: String,
    enum: ['red','blue','black','white','yellow','green'],
    message: 'Color is either: red, blue, black, white, yellow or green'
  },
  reviews: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
  }],
  createdAt: { type: Date, default: Date.now }
});

const Car = mongoose.model('Car', carSchema);

export default Car;