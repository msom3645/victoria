const mongoose = require('mongoose')

const StylistsSchema = new mongoose.Schema({
    pic: {type:String, required: true},
    name: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    salon: {type: String, required: true}
}, {timestamps:true})

const StylistsModel = mongoose.model('Stylists', StylistsSchema)
module.exports = StylistsModel

