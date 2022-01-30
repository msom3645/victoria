const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    salon: {type: String, required: true},
    name: {type: String, required: true},
    service: {type: String, required: true},
    spec: {type: String, required: true},
    phone: {type: String, required: true},
    date: []
}, {timestamps:true})


const BookModel = mongoose.model('Book', BookSchema)
module.exports = BookModel







