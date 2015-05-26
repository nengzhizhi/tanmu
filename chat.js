var io = require('socket.io')();
var uuid = require('node-uuid');

var roomId = '1001';
var room = io.of('/room/' + roomId);

function Room(opts){
	this.seats = new Array();
}

Room.prototype.create = function () {

}

Room.prototype.delete = function () {

}



function createSeats(row, column){
	var seats = new Array();

	for(var i=0;i<column;i++){
		seats[i] = new Array();
	}

	return seats;
}


function shuffle(array){

}

room.on('connection', function (socket){
	console.log(socket.conn.server.clientsCount);
});
io.listen(3001);
var seats = createSeats(5,5);
seats[1][4] = uuid.v1();
console.log(seats);


room = io.of('/chat/1001');
var chatters = {};
room.on('connection', function (socket) {
	//房间有新的连接请求
	var token = uuid.v1();
	var row = Math.random(0,10);
	var column = Math.random(0,10);

	//返回新链接
	socket.emit('connected', {
		token : token,
		row : row,
		column : column
	});

	//初始化个人信息
	socket.on('personalize', function (data){
		chatters[data.token] = data.nickname;
	})


	//处理消息
	socket.on('message', function (data){
		room.emit('message', {
			sender : chatters[data.token],
			msg : data.msg
		});
	});

	//断开连接
	socket.on('disconnect', function(){
		console.log(token);
	});

});

/*
var room = function() {
	id : ,
	cinema : ,
	movie : ,

}

var spectator = function(token) {
	token : token,
	nickname : '',
	avatar : ''
	seat : {
		row : ,
		column : 
	}

}

room.on('connection', function (socket) {



	socket.emit('connect', {
		token : token,
		count : 
	});


	socket.on('message', function (data) {

	});

	socket.on('disconnect', function () {

	});
})
*/