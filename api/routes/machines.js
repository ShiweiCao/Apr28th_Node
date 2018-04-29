const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const MachinesController = require('../controllers/machines');

router.get('/', checkAuth, MachinesController.machines_get_all);
router.get('/:machineId', checkAuth, MachinesController.machines_get_machine_by_id);
router.post('/', checkAuth, MachinesController.machines_create_machine);
// router.delete('/:machineId', checkAuth, MachinesController.machines_delete_machine);

module.exports = router;
