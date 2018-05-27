import { Mongoose } from "mongoose";

const MenuSchema = new Mongoose.Schema({
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
