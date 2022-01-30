const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel.js')
const {emailText, send} = require('../utils/nodemailer')

const genToken = (user) => {
    return jwt.sign({
        _id: user._id,
        user: user.name,
        email: user.email,
        img: user.img,
        imgPath: user.imgPath,
        isAdmin: user.isAdmin
    }, process.env.SECRET
    //  {expiresIn:'5d'}
     )
}

// REGISTER
exports.reg = async(req, res) => {
    const {user, email, text, subj} = req.body
    const rand = Math.floor(1000 + Math.random() * 9000)
    try{
        const data = await User.findOne({email})
        if(data){
            res.status(400).send({message:'Email already exists!'})
        }else{
            send(emailText(user, rand, text), email, subj, rand, res)     
        }
    }catch(e){
        res.status(500).send({message: e})
    }
}

exports.regModel = async(req, res) => {
    const {user, email, pass} = req.body
      try{
        const data = await User.create({
            user, email, pass: bcrypt.hashSync(pass,6)
        })
        if(data){
            res.status(200).send({
                _id: user._id,
                user: user.user,
                email: user.email,
                token: genToken(user)
            })
        }
      }catch(e){
          res.status(500).send({message:'Server Error! Try later!'})
      }
}

//LOGIN

exports.login = async(req, res) => {
    const {email, pass} = req.body
    const user = await User.findOne({email})
    try{
        if(user){
            if(bcrypt.compareSync(pass, user.pass)){
                res.status(200).send({
                    _id:user._id,
                    email: user.email,
                    user: user.user,
                    isAdmin: user.isAdmin,
                    img: user.img,
                    imgPath: user.imgPath,
                    token: genToken(user)
                })
            }else{
                res.status(401).send({message:'Invalid email or password'})
            }
        }
    }catch(e){
        res.status(500).send({message:'Server Error, try later!'})
    }
}


//RESET PASSWORD
exports.resetPass = async(req, res) => {
    const {email, text, subj} = req.body
    const rand = Math.floor(1000 + Math.random() * 9000)
    try{
        const data = await User.findOne({email})
        if(data){
            send(emailText(data.user, rand, text), email, subj, rand, res)     
        }else{
            res.status(400).send({message:'Email not found!'})
        }
    }catch(e){
        res.status(500).send({message:'Server Error! Try later!'})
    }
}

exports.updateUser = async(req, res) => {
    const {user, email, pass, isAdmin} = req.body
    try{
        const data = await User.findOne({email})
        data.user = user || data.user,
        data.email = email || data.email,
        data.isAdmin = isAdmin|| data.isAdmin,
        data.pass = bcrypt.hashSync(pass,6) || data.pass
        await data.save()
        res.status(200).send({messge:'Done!'})
    }catch(e){
        res.status(500).send({message:'Server Error! Try later!'})
    }
}