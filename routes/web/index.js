const express = require('express');
const router = express.Router();
const low = require('lowdb')
const moment = require('moment');
const checkLoginMiddelware = require('../../middlewares/checkLoginMiddleware');

const AccountModel = require('../../models/AccountModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/account');
});
router.get('/account',checkLoginMiddelware, function(req, res, next) {
  
  AccountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      console.log(err);
      res.status(500).send('show error...');
      return;
    }
    res.render('list',{accounts:data,moment});
  })
  
});
router.get('/account/creation',checkLoginMiddelware,function(req,res,next){
  res.render('create');
});
router.get('/account/:id',checkLoginMiddelware,(req,res) =>{
  let {id} = req.params;
  AccountModel.deleteOne({_id:id},(err,data)=>{
    if(err){
      console.log(err);
      res.status(500).send('deletion error...');
      return;
    }
    console.log(data);
    res.render('success',{msg:'delete success',url:'/account'});
  })
  // db.get('accounts').remove({id}).write();
  
})
router.post('/account', checkLoginMiddelware,(req, res) => {
  console.log(req.body);
  //2023-02-24 ==> Object ==> new Date() (using moment)
  AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  },(err,data) =>{
    if(err){
      console.log(err);
      res.status(500).send('insertion failed...');
      return;
    }
    res.render('success',{msg:' add success',url:'/account'});
  })
  
});

module.exports = router;
