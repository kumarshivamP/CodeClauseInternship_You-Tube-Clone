require('dotenv').config();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const { createErr } = require("../error");
const jwt = require('jsonwebtoken');



exports.signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const user = new User({ ...req.body, password: hash });

        await user.save();
        res.status(200).send("user has been created successfully")
    } catch (error) {
        next(err)
    }
}

exports.signin = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createErr(404, "User Not Found"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return next(createErr(400, "Wrong Credentials"))

        const token = jwt.sign({ id: user._id }, process.env.SECRET)
        const { password, ...others } = user._doc

        res.status(200).json({ data: others, authToken: token })

    } catch (error) {

        next(error)
    }
}

exports.googleAuth = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json({ data: user._doc, authToken: token })
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: user._id }, process.env.SECRET)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json({ data: savedUser._doc, authToken: token })
        }

    } catch (error) {

        next(error)
    }
}