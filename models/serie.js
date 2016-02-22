var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var SerieSchema = Schema({
    _creator: { type: String, ref: 'User' },
    title    : String,
    showId   : String,
    overview   : String,
    posterPath   : String,
    backPath   : String,
    userId   : { type: String, ref: 'User' },
    seasons  : []
});
module.exports = mongoose.model('Serie', SerieSchema);