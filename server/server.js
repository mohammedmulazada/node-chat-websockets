const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')

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
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the channel'))

	
	//socket is een custom event listener
	socket.on('createMessage', (newMsg) => {
		console.log('createMessage', newMsg)
		io.emit('newMessage', generateMessage(newMsg.from, newMsg.text))
		// 	from: newMsg.from,
		// 	text: newMsg.test,
		// 	createdAt: new Date().getTime()
		// })
	})

	socket.on('disconnect', () => {
		console.log('User is disconnected')
	})

})


server.listen(port, (req, res) => {
	console.log(`Server running on port ${port}`)
})