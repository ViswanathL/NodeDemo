var express = require('express');
var router = express.Router();
var config = require('./config/config');
var message = require('./config/message');
var userService = require('./service/UserService');

/*
* TYPE: GET,
* METHOD: Get user details
* PARAM: userId
*/
router.get(config.USER_DETAILS_URL, function(request, response) {
	try {
		var userId = request.param('userId');
		var db = request.db;
		userService.getUserDetails(db, userId, function(responseJson) {
			response.json(responseJson);
		});
	} catch(e) {
		console.log(e);
		var responseJson = {status: false, message: config.INVALID_REQUEST};
		response.json(responseJson);
	}
});

/*
* TYPE: POST,
* METHOD: Add new user
* POST_DATA: User details 
*/
router.post(config.ADD_USER_URL, function(request, response) {
	try {
		var userDetails = request.body;
		var db = request.db;
		userService.addNewUser(db, userDetails, function(responseJson) {
			response.json(responseJson);
		});
	} catch(e) {
		console.log(e);
		var responseJson = {status: false, message: config.INVALID_REQUEST};
		response.json(responseJson);
	}
});

module.exports = router;