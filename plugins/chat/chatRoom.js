var uuid = require('node-uuid');

module.exports = ChatRoom;

function ChatRoom(options, server, path){
	this.chatters = {};
	this.connection = null;
	this.path = path;
	this.server = server;
	this.socket = null;
	this.status = 'run'
}

ChatRoom.prototype.create = function(){
	var self = this;

	self.connection = self.server.of(self.path);
	self.connection.on('connection', function (socket){
		self.socket = socket;
		var token = uuid.v1();

		socket.emit('connected',{token:token});
		socket.on('personalize', function (data){
			self.chatters[data.token] = data.nickname;

			self.connection.emit('join',{
				nickname: data.nickname
			});
		});

		socket.on('message', function (data){
			self.connection.emit('message',{
				nickname: self.chatters[data.token],
				msg: data.msg
			});
		})

		socket.on('disconnect', function(){
			if( self.connection ){
				self.connection.emit('leave',{
					nickname: self.chatters[token]
				});

				delete self.chatters[token];
			}
		})
	});

	console.log(self.connection);
}

ChatRoom.prototype.delete = function() {
	var self = this;

	if (self.connection) {
		delete self.connection;
		self.connection = null;
		delete self.chatters;
	}
}