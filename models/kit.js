import mongoose from 'mongoose'

const Schema = mongoose.Schema

const kitSchema = new Schema({
  profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
  style: String,
  color: String,
  length: String,
  stock: String,
  photo: String,
  title: String,
  description: String,
})

const Kit = mongoose.model('Kit', kitSchema)

export { Kit }
