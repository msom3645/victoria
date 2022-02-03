const SliderModel =require('../models/SliderModel')
const ServicesModel =require('../models/ServicesModel')
const StylistsModel =require('../models/StylistsModel')
const ContactsModel =require('../models/ContactsModel')
const AboutModel =require('../models/AboutModel')
const BookModel =require('../models/BookModel')

exports.createModel = async(req, res) => {
    const model = eval(req.body.model)
    const data = req.body.items
    try{
        const newdata = new model(data) 
        await newdata.save()
        res.status(200).send({message:'Done!'})
    }catch(e){
        return res.status(500).send({message: e.message})
    }
    }
    
    
exports.editModel = async(req, res) => {
    const model = eval(req.body.model)
    const data = await model.findById(req.body.id)    
    const newData = req.body.items
    try{
    
     Object.keys(data.toJSON()).map(el => {
            data[el] =  newData[el]      
    })
    data._id = req.body.id
    await data.save()
    res.status(200).send({message:'Done!'})
    }catch(e){
        res.status(500).send({message: e.message})
        console.log(e.message)
        
    }
    }

exports.findId = async(req, res) => {
        const model = eval(req.body.model)
        try{
            const data = await model.findById(req.params.id) 
            res.status(200).send(data)
    
        }catch(e){
            res.status(500).send({messsage: e.message})
        }
    }
    
exports.delId = async(req, res) => {
    const model = eval(req.body.model)
    try{
        const data = await model.findById(req.params.id)            
            await data.remove()
        res.status(200).send({msg:'Done'})
    }catch(e){
        res.status(500).send({message: e})
    }
}

