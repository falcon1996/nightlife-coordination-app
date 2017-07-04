'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Status = new Schema({
    
    current : {type: String, default: 'not going'},
    count: {type: Number, default: 0},
    barid : String
});

module.exports = mongoose.model('Status', Status)