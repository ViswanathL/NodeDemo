var userDao = require('../dao/UserDao');
var message = require('../config/message');

/*
* Do login for user
* @return responseJson
*/
exports.doUserLogin = function doUserLogin(db, userDetails, callback) {
	var responseJson;
	if(!userDetails || !userDetails.username || !userDetails.password) {
		responseJson = {status: false, message: config.INVALID_REQUEST};
		callback(responseJson);
	} else {
		var loginDetails = {username: userDetails.username, password: userDetails.password};

		if(isValidLogin(userDetails)) {
			userDao.getUserByNameAndPassword(db, loginDetails, function(user) {
				responseJson = user;
				if(user._id == '') {
					responseJson.status = false;
					responseJson.message = message.LOGIN_FAILED;
				} else {
					responseJson.status = true;
					responseJson.message = message.LOGIN_SUCCESS;
				}	
				callback(responseJson);
			});
		} else {
			callback(responseJson);
		}
	} 
}

/*
* Used to get user details
* @return responseJson
*/
exports.getUserDetails = function getUserDetails(db, userId, callback) {
	var responseJson;
	if(userId && userId != '') {
		userDao.loadUserById(db, userId, function(result) {
			if(result) {
				responseJson = {username: result.username, _id: result._id, userDetails: result.userDetails, status: true, message: ''};
			} else {
				responseJson = {status: false, message: message.UNABLE_TO_FETCH_USER_DATA};
			}
			callback(responseJson);
		});
	}
}

exports.addNewUser = function addNewUser(db, userDetails, callback) {
	var responseJson;
	// Modify data format
	var userData = { username: userDetails.username, password: userDetails.password,
					 userDetails: { address: userDetails.userDetails.address,
					 				email: userDetails.userDetails.email,
					 				phone: userDetails.userDetails.phone} };
	userDao.addNewUser(db, userData, function(saved) {
		if(!saved) {
			responseJson = {status: false, message: message.USER_NOT_SAVED};
	 	} else {
	 		responseJson = {status: true, message: message.USER_SAVED};
	 	}
	 	callback(responseJson);
	});
}

/*
* Valiate the user details
* @return true if valid, else vice versa
*/
function isValidLogin(userDetails) {
	var isValid = false;
	if(userDetails.username.length > 0 && userDetails.password.length > 0)
		isValid = true;
	return isValid;
}