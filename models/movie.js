var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var movieSchema = Schema({
    _creator : { type: Number, ref: 'User' },
    title    : String,
    fans     : [{ type: Number, ref: 'User' }]
});
module.exports = mongoose.model('Movie', movieSchema);