var mongoose = require('mongoose')
,Schema = mongoose.Schema
,ObjectId = Schema.ObjectId;

var statisticSchema = new Schema({
	module	: String,
	action	: String,
	detail	: {}
});

exports.statisticModel = mongoose.model('statistic', statisticSchema);