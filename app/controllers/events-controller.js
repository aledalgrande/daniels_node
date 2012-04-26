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
			res.render('admin/events/show', {
				title: 'Daniels ∙ Event'
				, event: req.event
			});
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

	app.delete('/admin/events/:id', express.basicAuth(username, password), function(req, res){
		var event = req.event;
		event.remove(function(err){
			if (err) res.send(err, 500);
			res.send('Removed', 200);
		});
	});
	
	app.get('/admin/events/:id/edit', express.basicAuth(username, password), function(req, res){
		res.render('admin/events/edit', {
			title: 'Daniels ∙ Edit Event'
			, event: req.event
		});
	});
	
	app.put('/admin/events/:id', express.basicAuth(username, password), function(req, res){
		var event = req.event;
		var venue = event.venue;
		// is there a cleverer way of doing this?
		event.fbId = req.body.event.fbId;
		event.title = req.body.event.title;
		event.start = req.body.event.start;
		event.end = req.body.event.end;
		venue.fbId = req.body.venue.fbId;
		venue.name = req.body.venue.name;
		venue.longitude = req.body.venue.longitude;
		venue.latitude = req.body.venue.latitude;
		venue.foursquareId = req.body.venue.foursquareId;
		venue.save(function(err){
			if (err) renderNew(res, event);
			else saveEvent(res, event, venue);
		});
	});
	
	app.param('id', express.basicAuth(username, password), function(req, res, next, id){
		Event
		.findOne({ _id : req.params.id })
		.populate('venue')
		.run(function(err, event) {
			if (err) return next(err, 500);
			if (!event) return next(new Error('Failed to load event ' + id, 404));
			req.event = event;
			next();
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

}