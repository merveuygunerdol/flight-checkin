const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const flightSchema = mongoose.Schema({
  seatPlan: {
    type: String,
    required:  true,
  },
})
flightSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('Flight', flightSchema);
