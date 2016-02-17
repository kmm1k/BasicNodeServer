var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
    SerieSchema = require('../models/serie')

var UserSchema = Schema({
        email       : String,
        password    : String,
        username    : String,
        series : [{ type: Schema.Types.ObjectId, ref: 'Serie' }]
});
module.exports = mongoose.model('User', UserSchema);