const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: {
        type:String,
        required: true,
    },
    userPw: {
        type:String,
        required: true,
    },
    userNick: {
        type: String
      },
    from:{
        type: String
      }
})

module.exports = mongoose.model("User", userSchema)