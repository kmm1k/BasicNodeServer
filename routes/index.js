var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function (passport, subscribe) {

    /* GET login page. */
    router.get('/', function (req, res) {
        // Display the Login page with any flash message, if any

        res.json({message: req.flash('message')});
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {session: false}),
        function (req, res) {
            var message = req.flash('message');
            if (message.length > 0) {
                console.log("here not undef");
                res.json({message: message});
            } else {
                console.log("here undef");
                subscribe.getSeries(req, res)
            }
        });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {session: false}),
        function (req, res) {
            var message = req.flash('message');
            if (message.length > 0) {
                console.log("here not undef");
                res.json({message: message});
            } else {
                console.log("here undef");
                res.json({id: req.user.id, username: req.user.username});
            }
        });

    /* Handle Subscription POST */
    router.post('/subscribe', function (req, res) {
        subscribe.addSerieToUser(req);
    });

    /* Handle UnSubscription POST */
    router.post('/unsubscribe', function (req, res) {
        subscribe.deleteSeries(req);
    });

    /* Handle updateSeries POST */
    router.post('/updateseries', function (req, res) {
        subscribe.updateseries(req);
    });

    /* GET Home Page */
    router.get('/home', isAuthenticated, function (req, res) {
        res.render('home', {user: req.user});
    });

    /* GET Profile Page */
    router.get('/profile', isAuthenticated, function (req, res) {
        res.render('profile', {user: req.user});
    });

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/'
        }));


    return router;
}