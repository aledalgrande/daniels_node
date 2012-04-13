var EventSchema = new Schema({
  fbId: String,
  title: String,
	venue: { type: Schema.ObjectId, index: true, ref: 'Venue' },
	start: Date,
	end: Date,
	createdAt: { type: Date, default: Date.now() },
	updatedAt: Date
});

EventSchema.pre('save', function(next) {
  
	next();
});

module.exports = mongoose.model('Event', EventSchema);