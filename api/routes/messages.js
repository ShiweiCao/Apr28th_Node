const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const MessagesController = require('../controllers/messages');

router.get('/', checkAuth, MessagesController.messages_get_all);
router.get('/:messageId', checkAuth, MessagesController.messages_get_message_by_id);
router.post('/', checkAuth, MessagesController.messages_create_message);
// router.delete('/:messageId', checkAuth, MessagesController.messages_delete_message);

module.exports = router;
