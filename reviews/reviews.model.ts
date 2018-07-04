import * as mongoose from 'mongoose'
import { Restaurant } from './../restaurants/restaurants.model'
import { User } from './../users/users.model'

export interface IReview extends mongoose.Document {
	date: Date
	rating: number
	comments: string
	restaurant: mongoose.Types.ObjectId | Restaurant
	user: mongoose.Types.ObjectId | User
}

const reviewSchema = new mongoose.Schema({
	comments: {
		maxlength: 500,
		required: true,
		type: String
	},
	date: {
		required: true,
		type: Date
	},
	rating: {
		required: true,
		type: Number
	},
	restaurant: {
		ref: 'Restaurant',
		required: true,
		type: mongoose.Schema.Types.ObjectId
	},
	user: {
		ref: 'User',
		required: true,
		type: mongoose.Schema.Types.ObjectId
	}
})

export const review = mongoose.model<IReview>('Review', reviewSchema)
