var mongoDao = require('./MongoDaoSupport');

var userCollection = 'user';


/*
* Used to find user by name and password
*/
exports.getUserByNameAndPassword = function getUserByNameAndPassword(db, loginDetails, callback) {
	mongoDao.findOne(db, loginDetails, userCollection, function(err, user) {
		var loggedInUser;
		if(user) {
			loggedInUser = {username: user.username, _id: user._id};
		} else {
			loggedInUser = {username: loginDetails.username, _id: ''};
		}
		callback(loggedInUser);
	});
}

/*
* Load user by id
*/
exports.loadUserById = function loadUserById(db, userId, callback) {
	mongoDao.findById(db, userId, userCollection, function(err, result) {
		console.log('response received');
		callback(result);
	});
}

/*
* Used to add a new user
*/
exports.addNewUser = function addNewUser(db, userDetails, callback) {
	mongoDao.save(db, userDetails, userCollection, function(err, saved) {
		var isSaved = true;
		if(err || !saved)
			isSaved = false;
		callback(isSaved);
	});
}