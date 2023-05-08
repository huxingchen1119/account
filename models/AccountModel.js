const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    time:Date,
    type:{
        type:Number,
        default:-1
    },
    account:{
        type:Number,
        required:true
    },
    remarks:{
        type:String
    }

});

const AccountModel = mongoose.model('accounts',AccountSchema);
module.exports = AccountModel;