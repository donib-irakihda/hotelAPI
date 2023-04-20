const express = require('express');
const app = express();
require('dotenv').config();
let server
// const cors = require('cors')
require('../src/config/dbConfig');

app.use(express.json())

const userRouter = require('./routes/userRoutes');
const hotelRouter = require('./routes/hotelRoutes');

app.use('/api/users', userRouter)

app.use('/api/hotels', hotelRouter)



const port = process.env.Port || 8080;
if(process.env.NODE_ENV !== 'test')
server = app.listen(port, () => console.log(`Node server started at port ${port}`));

// afterAll((done) => {
//     if (server) {
//       server.close(done);
//     } else {
//       done();
//     }
//   });

module.exports = { app }