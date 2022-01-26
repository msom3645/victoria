const Phone = require('../models/PhoneModel.js')

exports.phone = async(req, res) => {
    
    try{
        const data = await Phone.findOne(req.body.phone)
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e})
    }
}

exports.phoneEdit = async(req, res)=>{
    
    try{
        const data = await Phone.findOne()
        data.phone = req.body.phone
        data.phone2 = req.body.phone2
        await data.save()
        res.status(200).send({message:'Done!'})
    }catch(e){
        res.status(500).send({message: e})
    }
}