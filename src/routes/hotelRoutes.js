const express = require('express');
const { register, viewHotel } = require('../controller/hotelController');
const auth = require('../middlewares/auth');
const { registerValidationRules } = require('../validators/hotelValidator')

const hotelRouter = express.Router();

hotelRouter.post('/register', auth, registerValidationRules(), register )

hotelRouter.get('/viewHotel', viewHotel)

module.exports = hotelRouter;