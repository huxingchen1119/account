const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserModdel = mongoose.model('users',UserSchema);
module.exports = UserModdel;