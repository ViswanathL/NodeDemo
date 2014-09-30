
/*
* This method is used to find one instance from database
*/

exports.findOne = function(db, whereClause, collection, callback) {
	db.collection(collection).findOne(whereClause, callback);
}

/*
* This method is used to find a database entry by id
*/
exports.findById = function(db, id, collection, callback) {
	db.collection(collection).findById(id, callback);
}

/*
* This method is used to Save data in to database
*/
exports.save = function(db, data, collection, callback) {
	db.collection(collection).save(data, callback);
}