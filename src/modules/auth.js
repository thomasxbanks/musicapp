let request = require('request')

module.exports = function(endpoint, data, req, res) {
	console.log(endpoint)
	request(endpoint, function(error, response, body) {
		console.log(response.statusCode, body)
		if (response.statusCode <= 200) {
			data.content = response
			console.log("**********\n", data)
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
