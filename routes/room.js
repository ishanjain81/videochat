const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room_controller');

router.get('/:room_id',roomController.room_render);
router.post('/invite',roomController.invite);

module.exports = router;