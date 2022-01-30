const mongoose = require('mongoose')

const StylistsSchema = new mongoose.Schema({
    img: {type:String, required: true},
    imgPath: {type: String, required: true},
    name: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    salon: {type: String, required: true}
}, {timestamps:true})

const StylistsModel = mongoose.model('Stylists', StylistsSchema)
module.exports = StylistsModel

