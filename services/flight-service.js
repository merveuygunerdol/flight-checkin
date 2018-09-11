const fs = require('fs');
const FlightModel = require('../models/flight-model')

async function chooseSeat(seatPlan) {
  return FlightModel.create(seatPlan);
}

module.exports = {
  chooseSeat
}
