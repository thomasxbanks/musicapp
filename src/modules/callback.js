let request = require('request')

module.exports = function(req, res) {
	console.log("REQUEST\n******************************************************", req)
	console.log("RESPONSE\n*****************************************************", res)
	let endpoint = 'http://scrummable.com/wp-json/wp/v2/posts?_embed'
	request(endpoint, function(error, response, body) {
		console.log(response.statusCode, body)
		if (response.statusCode <= 200) {
			let data = {
				page: 'callback',
				template: 'index',
				title: 'fuck',
				content: `your mum`
			}
			res.render(data.template, data)

		} else {
			console.log('error:', body)
			data.content = {
				statusCode: response.statusCode,
				message: body
			}
			console.log("**********\n", data)
			res.render(data.template, data)

		}
	})

}
