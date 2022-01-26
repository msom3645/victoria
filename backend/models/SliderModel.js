const mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
    imgPath: {type: String, required: true},
    img: {type:String, required: true},
    uptext: {type: String},
    bmtext: {type: String},
}, {timestamps: true})

const SliderModel = mongoose.model('Slider', SliderSchema)
module.exports = SliderModel