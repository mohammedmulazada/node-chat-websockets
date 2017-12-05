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

socket.on('newLocationMessage', function (message) {
	var li = jQuery('<li></li>')
	var a = jQuery('<a target="_blank">My current location</a>')

	li.text(`${message.from}: `)
	a.attr('href', message.url)
	li.append(a)
	jQuery('#messages').append(li)
})


const locationButton = document.querySelector('#send-location').addEventListener('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.')
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}), function () {
		alert('Unable to fetch location.')
	}
})