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

}