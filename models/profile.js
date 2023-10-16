import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rating: String,
  comment: String,
  profile: [profileSchema],
})

const profileSchema = new Schema({
  name: String,
  photo: String,
  location: String,
  instagram: String,
  twitter: String,
  nailTech: boolean,
  review: [reviewSchema],
  kit: [{type: Schema.Types.ObjectId, ref: 'Kit'}]
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
