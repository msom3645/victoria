const User = require('../models/UserModel.js')
const fse = require('fs-extra')
const bcrypt = require('bcrypt')
const editImg = (res, items, file) => {
    
    fse.pathExists(items.imgPath, (err, exists)=>{
        if(err){
            return res.status(500).send({message: err})
        }else{
            if(exists){
                return res.status(400).send({message:'Image with the same name already exists!'})
            }else{
                fse.remove(items.oldImgPath, err => {
                    if(err){
                        res.status(500).send({message:'Error while removing old image' + err})
                    }else{
                        file.mv(items.imgPath, err => {
                            if(err){
                                console.log(err)
                                return res.status(500).send({message:err})
                            }else{
                                res.status(200).send({message:'done'})
                            }
                        })
                    }
                })
                
            }
        }
    })
}

exports.userEditImg = async (req, res) => {
    const items = JSON.parse(req.body.items)
    const file = req.files.file
    const user = await User.findById(items.id)
    try{
        user.img = req.files.file.name
        user.imgPath = items.imgPath
        await user.save()
        editImg(res, items, file)
    }catch(e){
        res.status(500).send({message:e.response})
    }   
}

exports.userDelImg = async(req, res) => {
    fse.remove(req.body.imgPath, err =>{
        if(err){
            res.status(500).send({message:'Error while removing an image' + err})
        }
    })
    try{
        const user = await User.findById(req.body.id)
        user.img = ''
        user.imgPath = ''
        await user.save()
        res.status(200).send('Done')
    }catch(e){
        res.status(500).send({message: e.response})
    }
}

exports.userProfile = async(req, res) => {
    try{
        const data = await User.findById(req.body.id)
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.response})
    }
}

exports.profileEmail = async(req, res) => {
    try{
        const user = await User.findById(req.body.id)
        user.email = req.body.newEmail
        await user.save()
        res.status(200).send('Done!')
    }catch(e){
        res.status(500).send({message: e.response})
    }
}


exports.profilePass = async(req, res) => {
    try{
        const user = await User.findById(req.body.id)
        if(bcrypt.compareSync(req.body.oldPass, user.pass)){
            user.pass = bcrypt.hashSync(req.body.pass,6)
            await user.save()
            res.status(200).send('Done!')
        }else{
            res.status(401).send({message:'Old password is wrong!'})
        }
    }catch(e){
        res.status(500).send({message: e.response})
    }
}
