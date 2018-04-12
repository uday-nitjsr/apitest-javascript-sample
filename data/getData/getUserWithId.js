var allUser = require('../../data/users.js');
module.exports = function(id){
	var retVal;
	allUser.forEach(function(user){
		if(user.user_id===id){
			retVal = user;
		}
	});
	return retVal;
}