/**
 * Created by kmm on 16.02.2016.
 */
var Serie = require('../models/serie')
var User = require('../models/user')

function findIndexFromSeries(series, data) {
    for (var i = 0; i < series.length; i++) {
        if (series[i].showId == data.showId) {
            return i;
        }
    }
    return -1;
}
var mod = module.exports = {

    addSerieToUser: function (req) {
        var data = req.body;
        console.log(data.name);
        //console.log(data.seasons);


        var newSeries = new Serie();
        newSeries._creator = data.userId;
        newSeries.title = data.title;
        newSeries.showId = data.showId;
        newSeries.userId = data.userId;
        newSeries.seasons = data.seasons;
        newSeries.save(function (err) {
            if (err) {
                console.log('Error in Saving series: ' + err);
                throw err;
            }

        });
        User.findOne({'_id': data.userId}, function (err, user) {
            if (err)
                return;
            user.series.push(newSeries);
            user.save();
        })


    },
    getSeries: function (req, res) {
        User.findOne({'_id': req.user.id}, function (err, user) {
            //console.log(user)
            if (err)
                return;
            //console.log(user);
        }).populate('series')
            .exec(function (error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
                res.json({id: req.user.id, username: req.user.username, series: posts.series});
            });
    },
    deleteSeries: function (req) {
        var data = req.body;
        User.findOne({'_id': data.userId}, function (err, user) {
            if (err)
                return;
            //console.log(user);
        }).populate('series')
            .exec(function (error, posts) {
                var index = findIndexFromSeries(posts.series, data);
                if (index == -1){
                    console.log("error")
                    return;
                }
                mod.saveToSeries(index, req);
            });
    },
    saveToSeries: function(index, req) {
        var data = req.body;
        User.findOne({'_id': data.userId}, function (err, user) {
            if (err){
                return;
            }

            console.log(index)
            console.log(user.series)
            user.series.splice(index, 1);
            console.log(user.series)
            user.save();
        })
    },
    updateseries: function(req) {
        console.log(req)
        mod.deleteSeries(req);
        mod.addSerieToUser(req);
    }

}