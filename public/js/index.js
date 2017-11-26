// soort van require
var socket = io()
//on connect ipv connection
socket.on('connect', function () {
	console.log('Connected to server')

	socket.emit('createMessage', {
		to: 'mo@example.com',
		text: 'Hey mo'
	})
})

socket.on('disconnect', function () {
	console.log('Connection lost')
})
//email callback komt van server.js socket.emit

socket.on('newMessage', function (msg) {
	console.log('New message', msg)
})