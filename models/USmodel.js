const mongoose = require('mongoose');
const {Schema} = mongoose;
var randomstring = require('randomstring');
const userSchema = new Schema({
    
        firstName: String,
        lastName: String,
        eMail:  String,
        phoneNumber: String,
        userID: String
    }
,{timestamps:true});

const User = mongoose.model('user', userSchema);

module.exports = User;