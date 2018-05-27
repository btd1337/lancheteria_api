const restful = require('node-restful')
const mongoose = restful.mongoose

const restaurantsSchema = new mongoose.Schema({
	name: { type: String, required: true},
	category: { type: String, required: true},
	deliveryEstimate: { type: String, required: true},
	rating: { type: Number, required: true},
	imagePath: { type: String, required: true},
	about: { type: String, required: true},
	hours: { type: String, required: true},
	open: { type: Boolean, required: true, default: false},
	favorite: { type: Boolean, required: true}
})

restaurantsSchema.set('toJSON', {
	virtuals: true
});

module.exports = restful.model('restaurants', restaurantsSchema)

