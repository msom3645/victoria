const StylistsModel =require('../models/StylistsModel')
const SliderModel =require('../models/SliderModel')
const ContactsModel = require('../models/ContactsModel')
const ServicesModel = require('../models/ServicesModel')
const AboutModel = require('../models/AboutModel')
const BookModel = require('../models/BookModel')
         
exports.allServices = async(req, res) => {
    try{
        const data = await ServicesModel.find()
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.message})
    }
}


exports.allImageShow = async(req, res) => {
    try{
        const data = await SliderModel.find()
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.message})
    }
}


exports.allStylists = async(req, res) => {
    try{
        const data = await StylistsModel.find()
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.message})
    }
}

exports.findStylists = async(req, res) => {
    try{
        const data = await StylistsModel.where('salon').equals(req.body.salon)
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.message})
    }
}

exports.allContacts = async(req, res) => {
    try{
        const data = await ContactsModel.find()
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.message})
    }
}

exports.allBook = async(req, res) => {
    try{
        const data = await BookModel.find()
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message:e.message})
    }
}


exports.about = async(req, res) => {
    try{
        const data = await AboutModel.find()
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.message})
    }
}







        



