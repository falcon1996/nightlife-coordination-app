'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Local = new Schema({
    
    ip: String,
    name: String
});

module.exports = mongoose.model('Local', Local);