var socket = io()

socket.on('connect', function () {
	console.log('Connected to server')
})

socket.on('disconnect', function () {
	console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
	const formattedTime = moment(message.createdAt).format('H:mm')
	const template = jQuery('#message-template').html()
	const html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	})

	jQuery('#messages').append(html)
	
	// console.log('newMessage', message)
	// var li = document.createElement('li')
	// var liText = document.createTextNode(`${message.from} ${formattedTime}: ${message.text}`)
	// li.appendChild(liText)

	// console.log(li)

	// document.querySelector('#messages').appendChild(li)
})

document.querySelector('#message-form').addEventListener('submit', function (e) {
	e.preventDefault()
	var inputText = document.querySelector('#message-form input:first-of-type')
	socket.emit('createMessage', {
		from: 'User',
		text: inputText.value
	}, function () {
		inputText.value = ''
	})
})

socket.on('newLocationMessage', function (message) {
	const formattedTime = moment(message.createdAt).format('H:mm')
	const template = jQuery('#location-message-template').html()
	const html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	})

	jQuery('#messages').append(html)

})


const locationButton = document.querySelector('#send-location')
locationButton.addEventListener('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.')
	}

	locationButton.disabled = true
	locationButton.innerHTML = 'Sending location...'

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.disabled = false
		locationButton.innerHTML = 'Send location'
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function () {
		locationButton.disabled = false
		locationButton.innerHTML = 'Send location'
		alert('Unable to fetch location.')
	})
})