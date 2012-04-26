var Event = mongoose.model('Event')

module.exports = function(app){
	
	app.get('/', function(req, res){
		Event.currentEvent(function(err, docs){
			if (err) res.render('DB error', 500);
			res.render('index', {
				title: 'Daniels'
				, event: docs.length > 0 ? docs[0] : null
			});
		});
	});
	
	app.get('/herenow', function(req, res){
		var https = require('https');
		https.get({host: 'api.foursquare.com', path: '/v2/venues/4ad7a112f964a520050d21e3/herenow?client_id=#{fsqci}&client_secret=#{fsqcs}&v=20120426'}, function(remote){
			remote.on('data', function(data) {
				json = JSON.parse(data);
				res.send(json.response.hereNow.count);
			});;
		});
	});

}