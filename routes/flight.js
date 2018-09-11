const express = require('express');
const router = express.Router();

const FlightService = require('../services/flight-service.js')

router.post('/seat-plan', async (req, res, next) => {
  const seatPlan = await FlightService.chooseSeat(req.body);
  res.send(seatPlan);
});

module.exports = router
