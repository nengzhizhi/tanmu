var io = require('socket.io')();
var uuid = require('node-uuid');

/*
module.exports = Room;

function Room(opts){
	this.path = null;
	this.chatters = {};
	this.seats = new Array();
	this.connection = null;
}

Server.prototype.create = function(){
	var self = this;

	self.path = '/room/';
	self.connection = io.of(self.path);
	self.connection.on('connection', function (socket){

	});
}

Server.prototype.delete = function(){

}
*/

room = io.of('/room/1001');
var chatters = {};
room.on('connection', function (socket) {
	//房间有新的连接请求
	var token = uuid.v1();

	//返回新链接
	socket.emit('connected', {
		token : token
	});

	//初始化个人信息
	socket.on('personalize', function (data){
		//检查昵称是否合法，和谐词
		//检查昵称是否被使用

		chatters[data.token] = data.nickname;

		room.emit('join', {
			nickname: data.nickname
		})
	})


	//处理消息
	socket.on('message', function (data){
		//消息合法检查
		//统计消息

		room.emit('message', {
			nickname : chatters[data.token],
			msg : data.msg
		});
	});

	//断开连接
	socket.on('disconnect', function(){
		room.emit('leave', {
			nickname: chatters[token]
		});
	});

});
io.listen(3001);
