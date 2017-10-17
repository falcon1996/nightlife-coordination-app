'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lists = new Schema({
    
    username: String,
    name: String,
    mylist: [String]
    
});

module.exports = mongoose.model('Lists', Lists);