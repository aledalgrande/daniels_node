var Event = new Schema({
  fbId: String,
  title: String,
	venue: {type: Schema.ObjectId, index: true},
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