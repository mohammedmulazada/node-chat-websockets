const path = require('path')
const express = require('express')

const app = express()

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

console.log(__dirname + '/../public')
console.log(publicPath)

app.listen(port, (req, res) => {
	console.log(`Server running on port ${port}`)
})