var Event = mongoose.model('Event');

module.exports = function(app){

	app.get('/admin', express.basicAuth(username, password), function(req, res){
		var query = Event.find({}).run(function (err, docs) {
		  res.render('admin/index', { title: 'Daniels ∙ Admin', events: docs });
		});
	});

}