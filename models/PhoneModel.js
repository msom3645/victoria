const mongoose = require('mongoose')

const PhoneSchema = new mongoose.Schema({
    phone: {type: String},
    phone2: {type: String}
}, {timestamps: true})

const PhoneModel = mongoose.model('Phone', PhoneSchema)
module.exports = PhoneModel






