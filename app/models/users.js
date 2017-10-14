'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    
    id: Number,
    count: { type: Number, default: 0 },
});

module.exports = mongoose.model('Users', Users);