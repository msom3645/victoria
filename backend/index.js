require('dotenv').config()
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const adminRoute = require('./router/admin.js')
const authRoute = require('./router/auth.js')
const userRoute = require('./router/user.js')
const app = express()
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
app.use(fileUpload({createParentPath:true}))
app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 5000

const start = async () => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('mongo  connected!')
        app.listen(PORT, console.log(`Server started on port: ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()