const { addVideo, deleteVideo, updateVideo, getVideo, trendVideo, addView, randomVideo, subVideo, getByTag, getBySearch } = require('../controllers/Video')
const express = require('express');
const { verifyToken } = require('../verifyToken');

const router = express.Router();


//create a video
router.post('/', verifyToken, addVideo)

//delete a video
router.delete('/:id', verifyToken, deleteVideo)

//update a video
router.put('/:id', verifyToken, updateVideo)

//find a video
router.get('/find/:id', getVideo)

router.put('/view/:id', addView)
router.get('/sub', verifyToken, subVideo)
router.get('/trend', trendVideo)
router.get('/random', randomVideo)
router.get('/tags', getByTag)
router.get('/search', getBySearch)

module.exports = router;