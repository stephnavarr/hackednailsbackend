import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
      .populate('kits')
    res.status(200).json(profile)
  } catch (error) {
    console.log(error);
    res.status(500).json(err)
  }
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

// reviews
const createReview = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const profile = await Profile.findById(req.params.id)
    profile.review.push(req.body)
    await profile.save()
    const newReview = profile.review [profile.review.length - 1]
    res.status(201).json(newReview)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

const deleteReview = async (req, res) => {
  try {
    console.log(req.params)
    req.body.owner = req.user.profile
    const profile = await Profile.findById(req.params.profileId)
    profile.review.remove({_id:req.params.rId})
    await profile.save()
    res.status(200).json(profile.review)
  } catch (error) {
    res.status(500).json(error)
  }
}

export { show, addPhoto, createReview, deleteReview }
