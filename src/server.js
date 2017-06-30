var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, '')))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views/')

app.get(['/'], function(req, res) {
	let data = {
		page: 'home',
		template: 'index',
		title: 'Music Player',
		content: '<a class="button" href="/login">Login</a>'
	}
	res.render(data.template, data)
	// auth(endpoint, data, req, res)
})

app.get('/login', function(req, res) {
	let my_client_id = `b62b812cd26d46059a1bcf355a5d2613` // Actual ID
	let redirect_uri = `http://localhost:1337/callback`
	var scopes = 'user-read-private user-read-email';
	res.redirect('https://accounts.spotify.com/authorize' +
		'?response_type=code' +
		'&client_id=' + my_client_id +
		(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
		'&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/callback', function(req, res) {
	let callback = require('./modules/callback.js')
	callback(req, res)
})

app.get('/test', function(req, res) {

	let data = {
		page: 'test',
		template: 'index',
		title: 'Music Player',
		tracks: tracks.sort(function(a, b) {
			return a.title > b.title
		})
	}

	res.render(data.template, data)

})
// Final catch-all
// keep this last in line to act as 404
app.get('/*', function(req, res) {
	res.send('404')
})

app.listen(1337)

const tracks = [{
	artist: "Ward Thomas",
	album: "From Where We Stand",
	title: "Push For The Stride",
	length: 3.52,
	playcount: 16
}, {
	artist: "Ward Thomas",
	album: "From Where We Stand",
	title: "Town Called Ugley",
	length: 3.33,
	playcount: 2
}, {
	artist: "Ward Thomas",
	album: "Cartwheels",
	title: "Guilty Flowers",
	length: 3.36,
	playcount: 10
}]
