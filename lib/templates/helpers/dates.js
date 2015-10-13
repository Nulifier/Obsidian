var _		= require("lodash");
var moment	= require("moment");
var utils	= require("./utils");

module.exports = {
	now: function(format, b, c) {
		var date = new Date();
		console.log(format);
		//console.log(b);
		//console.log(c);
		if (utils.isUndefined(format)) {
			return date;
		}
		else {
			return moment(date).format(format);
		}
	}
};