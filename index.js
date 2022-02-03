require('dotenv').config()
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const adminRoute = require('./router/admin.js')
const authRoute = require('./router/auth.js')
const userRoute = require('./router/user.js')
const app = express()
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb', extended:true}))
app.use(compression({
    level: 6,
    threshold: 10*1000,
    filter: (req, res) =>{
        if(req.headers['x-no-compression']){
            return false
        }
        return compression.filter(req, res)
    }
}))
app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log('connected to mongo')
})

mongoose.connection.on('error', (err)=>{
    console.log('err connecting', err)
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server running on port' + process.env.PORT)
})