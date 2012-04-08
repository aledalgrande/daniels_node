mongoose = require('mongoose')

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Event = new mongoose.Schema({
  fbId: String,
  title: String,
	venue: {type: ObjectId, index: true},
	start: Date,
	end: Date,
	createdAt: Date,
	updatedAt: Date
});

Event.pre('save', function(next) {
  getFBDetails();
	next();
});

module.exports = mongoose.model('Event', Event);