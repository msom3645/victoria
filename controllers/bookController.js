const Book = require('../models/BookModel.js')


exports.bookPost = async(req, res) => {
    const {name,  phone,salon,date, spec, service} = req.body
    if(!name || phone === '_' || !salon || !date || !spec || !service){
        return res.status(400).send({message:'Please, fill out all fields!'})
    }
    try{
        
        const data = new Book({
            name,  phone,salon,date,spec, service
        })
        await data.save()
        res.status(200).send({message:'Done!'})
    }catch(e){
        res.status(500).send({message: e.message})
    }
}


exports.bookDates = async(req, res) => {
    try{
        const data = await Book.where(req.body.salon).where('spec').equals(req.body.spec)
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message:e.message})
    }
}

exports.bookClients = async(req, res) => {
    try{
        const data = await Book.where('salon').equals(req.body.salon)
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message:e.message})
    }
}