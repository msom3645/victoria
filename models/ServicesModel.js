const mongoose = require('mongoose')

const ServicesSchema = new mongoose.Schema({
    pic: {type: String, required: true},
    service: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: Number, required: true},
    duration: {type: String, required: true},
}, {timestamps: true})

const ServicesModel = mongoose.model('Services', ServicesSchema)
module.exports = ServicesModel