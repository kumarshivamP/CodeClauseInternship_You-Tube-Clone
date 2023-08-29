const { createErr } = require("../error");
const User = require("../models/User");
const Video = require("../models/Video")


exports.addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    try {

        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)

    } catch (error) {

        next(error)
    }
}


exports.deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createErr(404, "Video not found"))

        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedVideo)
        }
        else {
            return next(createErr(403, 'You can update only your video'))
        }

    } catch (error) {
        next(error)
    }
}


exports.updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createErr(404, "Video not found"))

        if (req.user.id === video.userId) {
             await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("The video has been deleted")
        }
        else {
            return next(createErr(403, 'You can delete only your video'))
        }

    } catch (error) {
        next(error)
    }
}


exports.getVideo = async (req, res, next) => {
    try {

        const video = await Video.findById(req.params.id)
        if (!video) return next(createErr(404, "Video not found"))
        res.status(200).json(video)

    } catch (error) {
        next(error)
    }
}

exports.addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased")

    } catch (error) {
        next(error)
    }
}

exports.randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)

    } catch (error) {
        next(error)
    }
}

exports.trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}


exports.subVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;
        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

exports.getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}


exports.getBySearch = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({ title: { $regex: query, $option: "i"} }).limit(40)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}