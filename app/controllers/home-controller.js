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

	app.helpers({
		timeLeft: function(event){
			var now = new Date();
			var difference = event.start-now;
			if (difference > 8.64e7){
				var days = Math.round(difference/8.64e7);
				return 'about ' + days + ' day' + (days > 1 ? 's' : '') + ' to go';
			}
			else if (difference > 3.6e6){
				var hours = Math.round(difference/3.6e6);
				return 'about ' + hours + ' hour' + (hours > 1 ? 's' : '') + ' to go';
			}
			else{
				var minutes = Math.round(difference/6e4);
				return 'about ' + minutes + ' minute' + (minutes > 1 ? 's' : '') + ' to go';
			}
		}
	});
	
	app.dynamicHelpers({
		foursquare: function(req, res){
			if (req.headers['user-agent'].match(/iphone/i)){
				return 'foursquare://venues/';
			}
			else {
				return 'https://foursquare.com/mobile/checkin?vid=';
			}
		}
	});

}