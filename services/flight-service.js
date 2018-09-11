const fs = require('fs');
const FlightModel = require('../models/flight-model.js')

async function add(seatPlan) {
  return FlightModel.create(seatPlan);
}

module.exports = {
  add
}
