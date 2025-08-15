const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rolesMiddleware = require('../middlewares/roles.middleware');

const router = express.Router();

// Protect all user routes with authentication
router.use(authMiddleware);

// Routes for managing users (requires 'admin' or 'rrh' role)
router.get('/', rolesMiddleware(['admin', 'rrh']), userController.getAllUsers);
router.get('/:id', rolesMiddleware(['admin', 'rrh', 'manager', 'employee']), userController.getUserById); // Employees can view their own profile
router.post('/', rolesMiddleware(['admin', 'rrh']), userController.createUser);
router.put('/:id', rolesMiddleware(['admin', 'rrh', 'manager', 'employee']), userController.updateUser); // Employees/Managers can update their own profile
router.delete('/:id', rolesMiddleware(['admin', 'rrh']), userController.deleteUser);

module.exports = router;