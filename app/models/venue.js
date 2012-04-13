var VenueSchema = new Schema({
  fbId: { type: String, index: true },
  name: String,
	longitude: String,
	latitude: String,
	createdAt: { type: Date, default: Date.now() },
	updatedAt: Date
});

VenueSchema.pre('save', function(next) {

	next();
});

module.exports = mongoose.model('Venue', VenueSchema);