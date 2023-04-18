const express = require('express');
const { register, viewHotel } = require('../controller/hotelController');
const auth = require('../middlewares/auth');

const hotelRouter = express.Router();

hotelRouter.post('/register', register )

hotelRouter.get('/viewHotel', viewHotel)

module.exports = hotelRouter;