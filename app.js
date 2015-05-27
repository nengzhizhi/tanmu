var async = require('async');

var seneca = require('seneca')({
	debug:{
		undead:false
	}
})

seneca.use('./plugins/chat/service',{
	port : 3001,
	badwords : 'badwords.txt'
});

async.waterfall([
		function (next) {
			seneca.act({role:'chat',cmd:'createRoom'}, function (err, data){
				console.log(data);
				next(err, data);
			})
		}
	], function (err, result) {

	});