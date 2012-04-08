
/*
 * GET home page.
 */

var Event = mongoose.model('Event')

exports.index = function(req, res) {
  res.render('index', { title: 'Daniels' });
};

exports.admin = function(req, res) {
	var query = Event.find({});
	var events = query.where('createdAt').gte(new Date()).run(function (err, docs) {
	  res.render('admin/index', { title: 'Daniels ∙ Admin', events: docs });
	});
};