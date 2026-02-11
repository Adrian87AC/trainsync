const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.get('/users', authenticateToken, isAdmin, adminController.getUsers);
router.put('/users/:id', authenticateToken, isAdmin, adminController.updateUser);
router.delete('/users/:id', authenticateToken, isAdmin, adminController.deleteUser);

module.exports = router;
