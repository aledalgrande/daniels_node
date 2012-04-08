var Event = mongoose.model('Event');

module.exports = function(app){

	app.get('/admin/events/new', express.basicAuth(username, password), function(req, res){
		res.render('admin/events/new', {
			title: 'Daniels ∙ New Event',
			article: new Event({})
		})
	});

	app.get('/events/:id', express.basicAuth(username, password), function(req, res){});

	app.post('/events/create', express.basicAuth(username, password), function(req, res){});

	app.delete('/events', express.basicAuth(username, password), function(req, res){});

}