let request = require('request')

module.exports = function(req, res) {
	console.log(req)
	let data = {
		page: 'callback',
		template: 'index',
		title: 'fuck',
		content: `your mum`
	}
	res.render(data.template, data)
}
