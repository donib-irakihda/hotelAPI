const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const mongoose = require('mongoose');
app.use(express.json())

const userRouter = require('./routes/userRoutes');
const hotelRouter = require('./routes/hotelRoutes');

app.get('/', (req, res) => {
    res.send("Hello Hotel!")
})


app.use('/api/users', userRouter)

app.use('/api/hotels', hotelRouter)

const PORT = process.env.PORT || 8080
const uri = process.env.MONGO_URI

mongoose.connect(uri)
.then( () => {
    console.log("Database connected Successfully!!!")
    app.listen(PORT, ()=> {
        console.log(`Server started at port ${PORT}`)
    })
})
.catch( (error) => {
    console.log(error)
})



