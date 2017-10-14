'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lists = new Schema({
    
    username: String,
    //mylist: { type: Array, default: 0}
    
});

module.exports = mongoose.model('Lists', Lists);