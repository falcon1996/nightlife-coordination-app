'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lists = new Schema({
    
    username: String,
    name: String,
    mylist: [Number]
    
});

module.exports = mongoose.model('Lists', Lists);