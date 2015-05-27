var Server = require('socket.io');
var uuid = require('node-uuid');
var Filter = require('./wordFilter.js');

module.exports = function(options){
	options = options || {};
	var seneca = this;

	seneca.add({role:'chat',cmd:'createRoom'},	cmd_createRoom);
	seneca.chatters = {};
	seneca.wordFilter = new Filter({badwordsFile:'badwords.txt'});

	function cmd_createRoom(args, callback){
		seneca.io = new Server();
		seneca.io.on('connection' , function (socket) {
			var token = uuid.v1();

			socket.emit('connected',{token:token});
			socket.on('personalize', function (data){
				for (var key in seneca.chatters) {
					if (seneca.chatters[key] == data.nickname) {
						seneca.io.emit('error', {code:'100001'});
						return;
					}
				}
				seneca.chatters[data.token] = seneca.wordFilter.filter(data.nickname);

				seneca.io.emit('join',{
					nickname: seneca.chatters[data.token]
				});
				return;
			});

			socket.on('message', function (data){
				var message = 
				seneca.io.emit('message',{
					nickname: seneca.chatters[data.token],
					msg: seneca.wordFilter.filter(data.msg)
				});
			})

			socket.on('disconnect', function(){
				seneca.io.emit('leave',{
					nickname: seneca.chatters[token]
				});

				delete seneca.chatters[token];
			})			
		});
		seneca.io.listen(options.port);

		callback(null, seneca.io);
	}	

	return { name : 'chat' };
}