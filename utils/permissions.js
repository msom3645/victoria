const jwt = require('jsonwebtoken')

 exports.isAuth = (req, res, next) => {
      const auth = req.headers.authorization
      if(auth){
          const token = auth.slice(7, auth.length)
          jwt.verify(
              token,
              process.env.SECRET,
              (err, decode) => {
                  if(err){
                      res.status(401).send({message:'Invalid Token'})
                  }else{
                      req.user = decode
                      next()
                  }
              }
          )
      }else{
          res.status(401).send({message:'No Token'})
      }
  }

  exports.isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send({message:'Invalid Admin Token'})
    }
  }


