var fs = require('fs');

module.exports = wordFilter;

function wordFilter(options){
	this.badwords = fs.readFileSync(options.badwordsFile, 'utf-8').split('\r\n');
}

wordFilter.prototype.filter = function (rawStr) {
	var self = this;

	for (var i=0;i<self.badwords.length;i++) {
		var position = rawStr.indexOf(self.badwords[i]);
		if (position >=0) {
			rawStr = rawStr.replace(self.badwords[i], '***');
		}
	}

	return rawStr;
}