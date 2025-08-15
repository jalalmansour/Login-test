const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const rolesMiddleware = require('../middlewares/roles.middleware');

// Protect all training routes (example - adjust roles as needed)
router.use(authMiddleware);

// Training Courses
router.get('/courses', trainingController.getAllCourses);
router.get('/courses/:id', trainingController.getCourseById);
router.post('/courses', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.createCourse);
router.put('/courses/:id', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.updateCourse);
router.delete('/courses/:id', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.deleteCourse);

// Training Categories
router.get('/categories', trainingController.getAllCategories);
router.get('/categories/:id', trainingController.getCategoryById);
router.post('/categories', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.createCategory);
router.put('/categories/:id', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.updateCategory);
router.delete('/categories/:id', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.deleteCategory);

// Skills
router.get('/skills', trainingController.getAllSkills);
router.get('/skills/:id', trainingController.getSkillById);
router.post('/skills', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.createSkill);
router.put('/skills/:id', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.updateSkill);
router.delete('/skills/:id', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.deleteSkill);

// Resource Library
router.get('/resources', trainingController.getAllResources);
router.get('/resources/:id', trainingController.getResourceById);
router.post('/resources', rolesMiddleware(['RRH', 'RF', 'Trainer', 'Admin']), trainingController.createResource);
router.put('/resources/:id', rolesMiddleware(['RRH', 'RF', 'Trainer', 'Admin']), trainingController.updateResource);
router.delete('/resources/:id', rolesMiddleware(['RRH', 'RF', 'Admin']), trainingController.deleteResource);

module.exports = router;