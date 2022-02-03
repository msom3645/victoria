const mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
    pic: {type: String, required: true},
    uptext: {type: String},
    bmtext: {type: String},
}, {timestamps: true})

const SliderModel = mongoose.model('Slider', SliderSchema)
module.exports = SliderModel