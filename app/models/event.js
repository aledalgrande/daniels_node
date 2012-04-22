var EventSchema = new Schema({
  fbId: String,
  title: String,
	venue: { type: Schema.ObjectId, index: true, ref: 'Venue' },
	start: Date,
	end: Date,
	createdAt: { type: Date, default: Date.now() },
});

EventSchema.statics.currentEvent = function currentEvent(callback){
	this.where('end').gte(new Date()).sort('end', -1).limit(1).populate('venue').run(callback);
}

module.exports = mongoose.model('Event', EventSchema);