const mongoose = require('mongoose')

const challengersSchema = mongoose.Schema({
    challengeNum: {
        type:String,
        required: true,
    },
    challengeTitle: {
        type:String,
        required: true,
    },
    challengeContent: {
        type:String,
        required: true,
    },
})

module.exports = mongoose.model("Challengers", challengersSchema)