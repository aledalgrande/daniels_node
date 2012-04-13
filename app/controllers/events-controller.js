var Event = mongoose.model('Event');
var Venue = mongoose.model('Venue');

module.exports = function(app){

	app.get('/admin/events/new', express.basicAuth(username, password), function(req, res){
		Event.find({}).run(function(err, docs){
			res.render('admin/events/new', {
				title: 'Daniels ∙ New Event'
				, event: new Event({})
				, venues: docs
			});
		});
	});

	app.get('/admin/events/:id', express.basicAuth(username, password), function(req, res){
		Event.findOne({_id: req.params.id}).populate('venue').run(function(err, event){
			if (err) return res.send(err, 500);
			if (!event) return res.send('Failed to load event ' + id, 404);
			res.render('admin/events/show', {
				title: 'Daniels ∙ Event'
				, event: event
			});
		})
	});

	app.post('/admin/events', express.basicAuth(username, password), function(req, res){
		var event = new Event(req.body.event);
		var venue = new Venue(req.body.venue);
		Venue.findOne({fbId: venue.fbId}, function(err, doc){
			if (err || !doc) {
				venue.save(function(err){
					if (err) renderNew(res, event);
					else saveEvent(res, event, venue);
				});
			}
			else {
				saveEvent(res, event, doc);
			}
		});
	});
	
	saveEvent = function(res, event, venue){
		event.venue = venue._id;
		event.save(function(err){
			if (err) {
				renderNew(event);
			}
			else {
				res.redirect('/admin/events/' + event._id);
			}
		});
	}
	
	renderNew = function(res, event){
		res.render('admin/events/new', {
			title: 'Daniels ∙ New Event'
			, event: event
		});
	}

	app.delete('/admin/events', express.basicAuth(username, password), function(req, res){});

}