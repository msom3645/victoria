const nodemailer = require('nodemailer')
require('dotenv').config()

exports.emailText = (user, rand, text) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap');
        
        .box {
            width: 70%;
            margin: auto;
            text-align: center;
               }
        .logo{
            letter-spacing: 5px; color: red;
            font-family: 'Monsieur La Doulaise', cursive;
            color: rgba(129, 207, 224, 1);
        }
        small{
            color: purple;
        }
            
    </style>
    </head>
    <body>
          <div class='box'>
          <h1 class='logo'>Victoria</h1>
          <p>
          Hi, ${user}! ${text}  
          </p>
          <h2 id='rand'>${rand}</h2>
          </div>
    </body>
    </html>`
}



exports.send = (text, email, subj, rand, res) => {
    
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.USER,
            pass: process.env.PASS,
        }
    })
    let mailOptions = {
        from: 'Victoria',
        to: email,
        subject: subj,
        html: text
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            console.log('Email sent', data)
            res.status(200).send({rand})
        }
    })
}



