'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    
    //ip: String,
    //barid: String,
    //going: Boolean,
    //count: { type: Number, default: 0 },
    
    _id: String,
    token: String,
    displayName: String,
    username: String
});

module.exports = mongoose.model('Users', Users);