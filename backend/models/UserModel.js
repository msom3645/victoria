const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user:{type: String, require: true},
    email:{type: String, require: true},
    pass:{type: String, require: true},
    isAdmin: {type: Boolean, default: false},
    imgPath: {type:String},
    img: {type:String},
})

module.exports = mongoose.model('User', UserSchema)