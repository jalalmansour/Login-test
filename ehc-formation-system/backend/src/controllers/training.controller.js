const trainingService = require('../services/training.service');

const createTrainingCourse = async (req, res, next) => {
  try {
    const course = await trainingService.createTrainingCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

const getAllTrainingCourses = async (req, res, next) => {
  try {
    const courses = await trainingService.getAllTrainingCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const getTrainingCourseById = async (req, res, next) => {
  try {
    const course = await trainingService.getTrainingCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Training course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

const updateTrainingCourse = async (req, res, next) => {
  try {
    const updatedCourse = await trainingService.updateTrainingCourse(req.params.id, req.body);
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Training course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

const deleteTrainingCourse = async (req, res, next) => {
  try {
    const deleted = await trainingService.deleteTrainingCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Training course not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const createTrainingCategory = async (req, res, next) => {
  try {
    const category = await trainingService.createTrainingCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getAllTrainingCategories = async (req, res, next) => {
  try {
    const categories = await trainingService.getAllTrainingCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const skill = await trainingService.createSkill(req.body);
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

const getAllSkills = async (req, res, next) => {
  try {
    const skills = await trainingService.getAllSkills();
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

const createResource = async (req, res, next) => {
  try {
    const resource = await trainingService.createResource(req.body);
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

const getAllResources = async (req, res, next) => {
  try {
    const resources = await trainingService.getAllResources();
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createTrainingCourse,
  getAllTrainingCourses,
  getTrainingCourseById,
  updateTrainingCourse,
  deleteTrainingCourse,
  createTrainingCategory,
  getAllTrainingCategories,
  createSkill,
  getAllSkills,
  createResource,
  getAllResources,
};