
const mongoose = require('mongoose')

const connectionstr = 
'mongodb://localhost:27017/Store_API'

const connectDB = mongoose.connect(connectionstr)

module.exports = connectDB