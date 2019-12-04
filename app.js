var app = require('./config/server');

 var server = app.listen(80, function() {
	console.log("Server On");
})

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
	console.log("Usuario Conectou");

	socket.on('disconnect', function(){
		console.log("User off");
	});

	socket.on('msgServer',function(data){
	
		/*  Mensagens da Conversa 	*/
		socket.emit(
		'msgClient',
		{apelido: data.apelido, 
		mensagem: data.mensagem}
		);

		socket.broadcast.emit(
		'msgClient',
		{apelido: data.apelido, 
		mensagem: data.mensagem}
		);


			/*  Participantes da Conversa 	*/
		 	 if (parseInt(data.apelido_atual) == 0){ 
				
			socket.emit(
			'partClient',
			{apelido: data.apelido}
			);

			socket.broadcast.emit(
			'partClient',
			{apelido: data.apelido}
			);

		 } 

		});

	});