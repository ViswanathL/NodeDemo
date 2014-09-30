var express = require('express');
var router = express.Router();
var config = require('./config/config');
var message = require('./config/message');
var userService = require('./service/UserService')

/*
* TYPE: POST,
* METHOD: Login
* POST_DATA: Username, Password
*/
router.post(config.LOGIN_URL, function(req, res) {
    var db = req.db;
    // Read post data
    var loginDetails = req.body;
    // Response json
    var responseJson;
    // Validate request data
    try {
		userService.doUserLogin(db, loginDetails, function(response) {
			responseJson = response;
			res.json(responseJson);
		});
	} catch(e) {
		console.log('Some error occured.');
	}

});

module.exports = router;
