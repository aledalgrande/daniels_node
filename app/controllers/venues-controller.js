// var Event = mongoose.model('Venue');

module.exports = function(app){

	app.get('/admin/venues/new', express.basicAuth(username, password), function(req, res){
		res.render('admin/venues/new', {
			title: 'Daniels ∙ New Venue',
			article: new Event({})
		})
	});

	app.get('/admin/venues/:id', express.basicAuth(username, password), function(req, res){
		
	});

	app.post('/admin/venues/create', express.basicAuth(username, password), function(req, res){
		
	});

	app.delete('/admin/venues', express.basicAuth(username, password), function(req, res){
		
	});
	
	app.get('/venues/:venue/herenow', function(req, res){
		var https = require('https');
		var path = "/v2/venues/" + req.params['venue'] + "/herenow?client_id=" + fsqci + "&client_secret=" + fsqcs + "&v=20120426";
		https.get({host: 'api.foursquare.com', path: path}, function(remote){
			remote.on('data', function(data){
				json = JSON.parse(data);
				res.send(json.response.hereNow)
			});
			remote.on('error', function(data){
				res.send('error' + data);
			});
		});
	});

}