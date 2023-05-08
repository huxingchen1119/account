var express = require('express');
var router = express.Router();
const moment = require('moment');
const jwt = require('jsonwebtoken');

const AccountModel = require('../../models/AccountModel');
const checkTokenMiddelware = require('../../middlewares/checkTokenMiddleware');



router.get('/account', checkTokenMiddelware, function(req, res, next) {
    console.log(req.user);
    AccountModel.find().sort({time:-1}).exec((err,data)=>{
      if(err){
        return res.json({
          code:'1001',
          msg:'read failed',
          data:null
        })
      }
      return res.json({
          code:'0000',
          msg:'read success',
          data
      });
    })
  
});
router.get('/account/creation',checkTokenMiddelware,function(req,res,next){
  res.render('create');
});
router.get('/account/:id',(req,res)=>{
    let {id} = req.params;
    AccountModel.findById(id,(err,data)=>{
        if(err){
            return res.json({
                code:'1004',
                msg:'find failed',
                data:null
            });
        }
        res.json({
            code:'0000',
            msg:'find success',
            data
        })
    })
})

router.delete('/account/:id',checkTokenMiddelware,(req,res) =>{
  let {id} = req.params;
  AccountModel.deleteOne({_id:id},(err,data)=>{
    if(err){
        return res.json({
            code:'1003',
            msg:'delete failed',
            data:null
          })
    }
    console.log(data);
    res.json({
        code:'0000',
        msg:'delete success',
        data:{}
      })
  });
})

  // db.get('accounts').remove({id}).write();
  router.patch('/account/:id',checkTokenMiddelware,(req,res)=>{
    let {id} = req.params;
    AccountModel.updateOne({_id:id},req.body,(err,data)=>{
        if(err){
            return res.json({
                code:'1005',
                msg:'update failed',
                data:null
            })
        }
        AccountModel.findById(id,(err,data)=>{
            if(err){
                return res.json({
                    code:'1004',
                    msg:'find failed',
                    data:null
                });
            }
            res.json({
                code:'0000',
                msg:'update success',
                data
            })

        })
        
    })
  })
  

router.post('/account', checkTokenMiddelware,(req, res) => {
  console.log(req.body);
  //2023-02-24 ==> Object ==> new Date() (using moment)
  AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  },(err,data) =>{
    if(err){
      res.json({
        code:'1002',
        msg:'create failed',
        data:null
      })
      return;
    }
    res.json({
        code:'0000',
        msg:'create success~',
        data
    })
  })
  
});

module.exports = router;
