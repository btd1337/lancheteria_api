const restful = require('node-restful')
const mongoose = restful.mongoose

const MenuSchema = new mongoose.Schema({
	description: { type: String, required: true},
	imagePath: { type: String, required: true},
  name: { type: String, required: true},
  price: { type: Number, required: true},
  restaurantId: { type: String, required: true}
})

MenuSchema.set('toJSON', {
	virtuals: true
});

module.exports = restful.model('menu', MenuSchema)
