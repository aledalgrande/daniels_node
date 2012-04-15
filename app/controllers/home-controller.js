var Event = mongoose.model('Event')

module.exports = function(app){
	
	app.get('/', function(req, res){
		Event.where('end').gte(new Date()).sort('createdAt', -1).limit(1).populate('venue').run(function(err, docs){
			if (err) res.render('DB error', 500);
			res.render('index', {
				title: 'Daniels'
				, event: docs.length > 0 ? docs[0] : new Event({})
			});
		})
	});

}