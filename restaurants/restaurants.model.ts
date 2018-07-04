import * as mongoose from 'mongoose'
import { IRestaurant } from './restaurants.model'

export interface IMenuItem extends mongoose.Document {
	name: string
	price: number
}

export interface IRestaurant extends mongoose.Document {
	name: string
	menu: IMenuItem[]
}

const menuSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	price: {
		required: true,
		type: Number
	}
})

const restaurantSchema = new mongoose.Schema({
	menu: {
		required: false,
		select: false, // not include in select
		type: [menuSchema]
	},
	name: {
		required: true,
		type: String
	}
})

export const restaurant = mongoose.model<IRestaurant>(
	'Restaurant',
	restaurantSchema
)
