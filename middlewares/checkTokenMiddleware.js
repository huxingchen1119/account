const jwt = require('jsonwebtoken');
const {secret} = require('../config/config')
module.exports = (req,res,next)=>{
    let token = req.get('token');
    if(!token){
      return res.json({
        code:'2002',
        msg:'no token',
        data:null
      })
    };
  
    jwt.verify(token,secret,(err,data)=>{
      if(err){
        return res.json({
          code: '2003',
          msg: 'wrong token',
          data: null
        })
      }
      req.user = data;
      next();
    });
  }