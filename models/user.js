var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = Schema({
        email       : String,
        password    : String,
        username    : String,
        movies : [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});
module.exports = mongoose.model('User', userSchema);