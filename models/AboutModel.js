const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    pic: {type:String, required: true},
    citation: {type:String},
    citation2: {type:String},
    text: {type:String, required: true}
},{timestamps: true})

const AboutModel = mongoose.model('About', AboutSchema)
module.exports = AboutModel





