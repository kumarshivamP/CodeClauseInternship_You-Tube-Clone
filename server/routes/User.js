const { updateUser, deleteUser, getUser, subscribe, unsubscribe, like, dislike } = require('../controllers/User')
const express = require('express');
const { verifyToken } = require('../verifyToken');

const router = express.Router();

// update user
router.put('/:id', verifyToken ,updateUser)
//delete user
router.delete('/:id', verifyToken, deleteUser)

//get a user
router.get('/find/:id', getUser)

//subscribe a user
router.put('/sub/:id', verifyToken, subscribe)

//unsubscribe a user
router.put('/unsub/:id', verifyToken, unsubscribe)

//like a video
router.put('/like/:videoId', verifyToken, like)

//dislike a video
router.put('/dislike/:videoId', verifyToken, dislike)

module.exports = router;