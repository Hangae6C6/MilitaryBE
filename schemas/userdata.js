const mongoose = require('mongoose')

const userdataSchema = mongoose.Schema({
    userId: {
        type:String,
        required: true,
        unique : true,
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
    // totalDate : {
    //     type:String,
    //     required: true,
    // }
})

module.exports = mongoose.model("Userdata", userdataSchema)