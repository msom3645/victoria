const User = require('../models/UserModel.js')
const bcrypt = require('bcrypt')

exports.userProfile = async(req, res) => {
    try{
        const data = await User.findById(req.body.id)
        res.status(200).send(data)
    }catch(e){
        res.status(500).send({message: e.response})
    }
}

exports.userEdit = async(req, res) => {
    try{
        const user = await User.findById(req.body.id)
        user.pic = req.body.userPic || user.pic
        user.email = req.body.newEmail || user.email
        await user.save()
        res.status(200).send({message:'Done!'})
    }catch(e){
        res.status(500).send({message: e})
    }
}
exports.userPassEdit = async(req, res) => {
    const user = await User.findById(req.body.id)
    try{
        if(bcrypt.compareSync(req.body.oldPass, user.pass)){
                user.pass = bcrypt.hashSync(req.body.pass, 6)
                await user.save()
                res.status(200).send({message:'Done!'})
        }else{
             res.status(401).send({message:'Old password is wrong!'})
        }
    }catch(e){
        res.status(500).send({message: e})
    }
}

exports.userPicDel = async(req, res) => {
    const user = await User.findById(req.body.id)
    try{
        user.pic =''
        await user.save()
        res.status(200).send({message:'Done!'})
    }catch(e){
        res.status(500).send({message:e.response})
    }
}

 

