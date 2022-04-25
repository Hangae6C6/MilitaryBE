const mongoose = require('mongoose')

const userdataSchema = mongoose.Schema({
    userName: {
        type:String,
        required: true,
    },
    startDate: {
        type:String,
        required: true,
    },
    endDate: {
        type:String,
        required: true,
    },
    armyCategory: {
        type:String,
        required: true,
    },
    rank: {
        type:String,
        required: true,
    },
    Q1: {
        type:Number,
        required: true,
    },
    Q2: {
        type:Number,
        required: true,
    },
    Q3: {
        type:Number,
        required: true,
    },
    Q4: {
        type:Number,
        required: true,
    },
})

module.exports = mongoose.model("Userdata", userdataSchema)