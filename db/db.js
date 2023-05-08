const {DBHOST, DBNAME, DBPORT} = require('../config/config.js')
module.exports = function(success,error){
    if(typeof(error) !== 'function'){
        error = ()=>{
            console.log('connection error');
        }
    }

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

mongoose.connection.once('open',()=>{
    success();
});

mongoose.connection.on('error',()=>{
    error();
});

mongoose.connection.on('close',()=>{
    console.log('close');
});

}