const { createErr } = require("../error");
const Comment = require("../models/Comment");
const Video = require("../models/Video");


exports.addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id })

    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment)

    } catch (error) {
        next(error)
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
      const comment =  await Comment.findById(req.params.id)
      const video =  await Video.findById(req.params.id)

      if(req.user.id===comment.userId || req.user.id===video.userId){
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("The comment has been deleted")

      }else{
        return next(createErr(403, "You can delete only your comment!"))
      }

    } catch (error) {
        next(error)
    }
}

exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}