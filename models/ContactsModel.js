const mongoose = require('mongoose')

const ContactsSchema = new mongoose.Schema({
    pic: {type: String, required: true},
    location: {type: String, required: true},
    tel: {type:String, required: true},
    period: {type:String, required: true}
}, {timestamps:true})

const ContactsModel = mongoose.model('Contacts', ContactsSchema)
module.exports = ContactsModel



