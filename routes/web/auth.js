const express = require('express');
const router = express.Router();
const UserModdel = require('../../models/UserModel')
const md5 = require('md5')



router.get('/reg',(req,res)=>{
  res.render('auth/reg');
})
router.post('/reg',(req,res)=>{
  UserModdel.create({...req.body,password:md5(req.body.password)},(err,data)=>{
    if(err){
      res.status(500).send('Error');
      return;
    }
    console.log(data);
    res.render('success',{msg:'Register Success', url:'/login'});
  })
 
});
router.get('/login',(req,res)=>{
  res.render('auth/login');
})
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
      return;
    }
    if(!data){
      return res.send('Do not exist or Password is Wrong');
    }
    // console.log(data);
    req.session.username = data.username;
    req.session._id = data._id;
    res.render('success',{msg:'Login Success',url:'/account'});
  })
})

module.exports = router;
