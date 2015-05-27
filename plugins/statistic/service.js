var statisticModel = require('./model.js').statisticModel;

model.exports = function (options) {
	var seneca = this;

	seneca.add({role:'statistic',cmd:'add'}, cmd_add);

	function cmd_add(args, callback){
		var instance = new statisticModel();
		instance.module = args.data.module;
		instance.action = args.data.action;
		instance.detail = args.data.detail;

		instance.save( function (err) {
			callback(err, instance);
		});
	}

	return { name : 'statistic' }
}