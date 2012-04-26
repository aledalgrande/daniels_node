var VenueSchema = new Schema({
  fbId: { type: String, index: true },
  name: String,
	longitude: String,
	latitude: String,
	createdAt: { type: Date, default: Date.now() },
	foursquareId: String,
});

module.exports = mongoose.model('Venue', VenueSchema);