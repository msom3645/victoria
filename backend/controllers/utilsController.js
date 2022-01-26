const fse = require('fs-extra') 
const SliderModel =require('../models/SliderModel')
const ServicesModel =require('../models/ServicesModel')
const StylistsModel =require('../models/StylistsModel')
const ContactsModel =require('../models/ContactsModel')
const AboutModel =require('../models/AboutModel')
const BookModel =require('../models/BookModel')

const createModel = async(req, res) => {
    const model = eval(req.body.model)
    const data = JSON.parse(req.body.items)
    try{
        const newdata = new model(data) 
        await newdata.save()
        res.status(200).send({message:'Done!'})
    }catch(e){
        fse.remove(data.imgPath, err =>{
            if(err){
                res.status(500).send({message:'Error while removing old image' + err})
            }
        })
        return res.status(500).send({message: e.message})
    }
    }
    
    
const editImgModel = async(req, res) => {
    const model = eval(req.body.model)
    const data = await model.findById(req.body.id)    
    const newData = JSON.parse(req.body.items)
    try{
    data.img = req.files?.file.name || data.img
    if(req.files){
        data.img = req.files.file.name
        fse.remove(data.imgPath, err =>{
            if(err){
                res.status(500).send({message:'Error while removing old image' + err})
            }
        })
    }else{
        data.img = data.img
    }
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

    const uploadImg = (res, path, file, createModel)  => {
        fse.pathExists(
            path, (err,exists) => {
                
            if(err){
                return res.status(500).send({message: err})
            }else{
                if(exists){
                    return res.status(400).send({message: 'Image with the same name already exists!'})
                }
                else{
                    file.mv(path, err => {
                        if(err){
                            console.log(err)
                        return res.status(500).send({message: err})
                        }else{
                            createModel()
                        }
                    })
                }
            }
            })
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
    const imgPath = req.body.imgPath
    try{
        const data = await model.findById(req.params.id)
        if(imgPath){
            fse.remove(imgPath, err => {
                if(err){
                    res.status(500).send({message: err})
                }
            })
                }
            
            await data.remove()
        res.status(200).send({msg:'Done'})
    }catch(e){
        res.status(500).send({
            message: e
        })
    }
}

exports.add = async(req, res) => {
    const path = JSON.parse(req.body.items).imgPath
    const file = req.files.file
    uploadImg(res, path, file,() => createModel(req, res))
}

exports.edit = async(req, res) => {
    const path = JSON.parse(req.body.items).imgPath
    if(req.files){
        uploadImg(res, path, req.files.file, () => editImgModel(req, res))
    }else{
        editImgModel(req, res)
    }
}

