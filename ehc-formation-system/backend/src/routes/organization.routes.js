const express = require('express');
const organizationController = require('../controllers/organization.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rolesMiddleware = require('../middlewares/roles.middleware');

const router = express.Router();

// Protect these routes with authentication and role checks
router.use(authMiddleware);
router.use(rolesMiddleware(['EHC_Admin', 'Client_Admin', 'RRH'])); // Example roles that can manage organizations

router.post('/', organizationController.createOrganizationUnit);
router.get('/', organizationController.getAllOrganizationUnits);
router.get('/:id', organizationController.getOrganizationUnitById);
router.put('/:id', organizationController.updateOrganizationUnit);
router.delete('/:id', organizationController.deleteOrganizationUnit);

module.exports = router;