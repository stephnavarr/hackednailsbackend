import { Kit } from '../models/kit.js'
import { Profile } from "../models/profile.js"


const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const kit = await Kit.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {kits: kit}},
      { new: true }
    )
    kit.owner = profile
    res.status(201).json(kit)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const kit = await Kit.findById(req.params.id)
      .populate('owner')
    res.status(200).json(kit)
  } catch (error) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const kit = await Kit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true}
    ) .populate('owner')
    res.status(200).json(kit)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteKit = async (req,res) => {
  try {
    const kit = await Kit.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.kit.remove({_id: req.params.id })
    await profile.save()
    res.status(200).json(kit)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  show,
  update,
  deleteKit
}