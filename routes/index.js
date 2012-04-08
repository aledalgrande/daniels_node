
/*
 * GET home page.
 */

var Event = require('../models/event.js')

exports.index = function(req, res) {
  res.render('index', { title: 'Daniels' });
};

exports.admin = function(req, res) {
	var query = Event.find({});
	var events = query.where('createdAt').gte(new Date()).run(function (err, docs) {
	  res.render('admin', { title: 'Daniels ∙ Admin', events: docs });
	});
};