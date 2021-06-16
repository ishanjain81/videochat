const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room_controller');

router.get('/:room_id',roomController.room_render);

module.exports = router;