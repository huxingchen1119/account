const express = require('express');
const router = express.Router();
const UserModdel = require('../../models/UserModel')
const md5 = require('md5')
const jwt = require('jsonwebtoken');
const {secret} = require('../../config/config')



router.post('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.render('success',{msg:'Logout Success',url:'/login'});
  })
})

router.post('/login',(req,res)=>{
  let {username,password} = req.body;
  UserModdel.findOne({username:username,password:md5(password)},(err,data)=>{
    if(err){
      res.status(500).send('Login Error');
      res.json({
        code:'2001',
        msg:'database read fail',
        data:null
      });
    }
    if(!data){
        return res.json({
            code:'2001',
            msg:'username or passwork wrong',
            data:null
          });
    }
    let token = jwt.sign({
        username:data.username,
        _id:data._id
    },secret,{
        expiresIn:60*60*24*7
    })

    return res.json({
        code:'0000',
        msg:'Login success',
        data:token
    })
    // res.render('success',{msg:'Login Success',url:'/account'});
  })
})

module.exports = router;
