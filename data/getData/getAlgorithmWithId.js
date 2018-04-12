var allUser = require('../../data/algorithms.js');
module.exports = function(id){
	var retVal;
	allUser.forEach(function(algorithm){
		if(algorithm._id===id){
			retVal = algorithm;
		}
	});
	return retVal;
}