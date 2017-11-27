var socket = io()

socket.on('connect', function () {
	console.log('Connected to server')
})

socket.on('disconnect', function () {
	console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
	console.log('newMessage', message)
	var li = document.createElement('li')
	var liText = document.createTextNode(`${message.from}: ${message.text}`)
	li.appendChild(liText)
	
	console.log(li)

	document.querySelector('#messages').appendChild(li)
})

socket.emit('createMessage', {
	from: 'Frank',
	text: 'Hi'
}, function (data) {
	console.log('Got it', data)
})


//f jquery
// $('#message-form').on('submit', function (e) {
// 	e.preventDefault()

// 	socket.emit('createMessage', {
// 		from: 'User',
// 		text: $('[name=message]').val()
// 	}, function () {
		
// 	})
// })

//sexy sexy javascript
document.querySelector('#message-form').addEventListener('submit', function (e) {
	e.preventDefault()

	socket.emit('createMessage', {
		from: 'User',
		text: document.querySelector('#message-form input:first-of-type').value
	}, function () {

	})
})