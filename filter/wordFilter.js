var fs = require('fs');
var async = require('async');

function readKeywords(fileName, callback){
	fs.readFile(fileName, 'utf-8', function (err,data){
		callback(err, data.split('\r\n'));
	});
}

function filterWords(rawStr){
	async.waterfall([
			function (next) {
				readKeywords('badwords.txt', next);
			}
		], function (err, badwords){
			for(var i=0;i<badwords.length;i++){
				var pos = rawStr.indexOf(badwords[i]);
				if (pos >= 0) {
					rawStr = rawStr.replace(badwords[i], '***');
				}
			}
			console.log(rawStr);			
		});
}