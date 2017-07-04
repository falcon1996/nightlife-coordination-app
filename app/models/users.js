'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    
    ip: String,
    barid: String,
    going: Boolean
});

module.exports = mongoose.model('Users', Users);