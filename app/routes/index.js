const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');

router.post("/save-call-id", callController.saveCallId);
router.get("/get-call-id/:id", callController.getCallId);

module.exports = router;
