const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

//socketio event listener
//callback
io.on('connection', (socket) => {
	console.log('New User connected')
	
	//socket is een custom event listener

	socket.on('createMessage', (newMsg) => {
		console.log('createMessage', newMsg)
	})

	socket.on('disconnect', () => {
		console.log('User is disconnected')
	})

	socket.emit('newMessage', {
		from: 'Bob',
		text: 'This is my message to you',
		createdAt: 123
	})
})


server.listen(port, (req, res) => {
	console.log(`Server running on port ${port}`)
})