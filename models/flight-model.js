const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const flightSchema = mongoose.Schema({
  column: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reserved: {
    type: Boolean,
    // required: true,
  },
})
flightSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('Flight', flightSchema);
