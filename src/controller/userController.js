const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const SECRET_JWT = process.env.SECRET_JWT

const register = async (req, res) => {
    //check for existing user
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({email: email})
        if (existingUser) {
            return res.status(400).json("User already exists with this email ")
        }

        //hashing pass.
        const hashedPassword = await bcrypt.hash(password, 10);

        //user creation
        const result = await UserModel.create( {
            name: name,
            email: email,
            password: hashedPassword
        })

        const token = jwt.sign({email: result.email, id: result._id}, SECRET_JWT)
        res.status(201).json({user: result, token: token})


    } catch(error){
        console.log(error)
        res.status(500).json({error: "Something went wrong!!"})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    //check if not existing user

    try {
        const existingUser = await UserModel.findOne({email: email})

        if(!existingUser) {
            return res.status(404).json({message: "User not found with this email " +email})
        }

        //match password
        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if (!matchPassword) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_JWT)

        res.status(200).json({user: existingUser, token: token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong!'})   
    }
}

module.exports = { register, login }