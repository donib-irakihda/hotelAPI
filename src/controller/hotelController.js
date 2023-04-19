const { validationResult } = require('express-validator')
const HotelModel = require('../models/hotel')


const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { name, address, contactNumber } = req.body;

    try {
        const existingHotel = await HotelModel.findOne({name: name})

        if (existingHotel) {
            return res.status(400).json({message: "HOtel name already exists"})
        }

        const result = await HotelModel.create( {
            name: name,
            address: address,
            contactNumber: contactNumber
        })

        res.status(201).json({hotel: result})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something went wrong!!"})
    }
}
    
const viewHotel = async (req, res) => {
    try {
         const hotel = await HotelModel.find();

         if(!hotel) {
             return res.status(404).json({message: "No Hotel found!!"})
         }

         res.status(200).json({hotel: hotel})

    } catch (error) {
         console.log(error)
         res.status(500).json({error: "Something went wrong!!"})
     } 
 }


module.exports = {register, viewHotel}