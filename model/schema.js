
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true , 'Product name must be required']
    },
    price : {
        type :Number,
        required : [true, 'required']
    },
    featured : {
        type : Boolean,
        default : false
    },
    rating : {
        type : Number,
        default : 4.5
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    company : {
        type : String,
        enum : {
            values : ['caressa','ikea','liddy','marcos'],
            message : '{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model('Product',ProductSchema)