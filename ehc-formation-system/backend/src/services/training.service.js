const {
  TrainingCourse,
  TrainingCategory,
  Skill,
  ResourceLibrary,
  TrainingSkill,
} = require("../models");

const createTrainingCourse = async (courseData) => {
  try {
    const course = await TrainingCourse.create(courseData);
    return course;
  } catch (error) {
    throw new Error("Error creating training course: " + error.message);
  }
};

const getTrainingCourseById = async (courseId) => {
  try {
    const course = await TrainingCourse.findByPk(courseId, {
      include: [TrainingCategory, Skill, ResourceLibrary],
    });
    return course;
  } catch (error) {
    throw new Error("Error fetching training course: " + error.message);
  }
};

const getAllTrainingCourses = async () => {
  try {
    const courses = await TrainingCourse.findAll({
      include: [TrainingCategory, Skill],
    });
    return courses;
  } catch (error) {
    throw new Error("Error fetching all training courses: " + error.message);
  }
};

const updateTrainingCourse = async (courseId, updateData) => {
  try {
    const course = await TrainingCourse.findByPk(courseId);
    if (!course) {
      throw new Error("Training course not found");
    }
    await course.update(updateData);
    return course;
  } catch (error) {
    throw new Error("Error updating training course: " + error.message);
  }
};

const deleteTrainingCourse = async (courseId) => {
  try {
    const course = await TrainingCourse.findByPk(courseId);
    if (!course) {
      throw new Error("Training course not found");
    }
    await course.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting training course: " + error.message);
  }
};

const createTrainingCategory = async (categoryData) => {
  try {
    const category = await TrainingCategory.create(categoryData);
    return category;
  } catch (error) {
    throw new Error("Error creating training category: " + error.message);
  }
};

const getTrainingCategoryById = async (categoryId) => {
  try {
    const category = await TrainingCategory.findByPk(categoryId, {
      include: [TrainingCourse],
    });
    return category;
  } catch (error) {
    throw new Error("Error fetching training category: " + error.message);
  }
};

const getAllTrainingCategories = async () => {
  try {
    const categories = await TrainingCategory.findAll();
    return categories;
  } catch (error) {
    throw new Error("Error fetching all training categories: " + error.message);
  }
};

const updateTrainingCategory = async (categoryId, updateData) => {
  try {
    const category = await TrainingCategory.findByPk(categoryId);
    if (!category) {
      throw new Error("Training category not found");
    }
    await category.update(updateData);
    return category;
  } catch (error) {
    throw new Error("Error updating training category: " + error.message);
  }
};

const deleteTrainingCategory = async (categoryId) => {
  try {
    const category = await TrainingCategory.findByPk(categoryId);
    if (!category) {
      throw new Error("Training category not found");
    }
    await category.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting training category: " + error.message);
  }
};

const createSkill = async (skillData) => {
  try {
    const skill = await Skill.create(skillData);
    return skill;
  } catch (error) {
    throw new Error("Error creating skill: " + error.message);
  }
};

const getSkillById = async (skillId) => {
  try {
    const skill = await Skill.findByPk(skillId, {
      include: [TrainingCourse],
    });
    return skill;
  } catch (error) {
    throw new Error("Error fetching skill: " + error.message);
  }
};

const getAllSkills = async () => {
  try {
    const skills = await Skill.findAll();
    return skills;
  } catch (error) {
    throw new Error("Error fetching all skills: " + error.message);
  }
};

const updateSkill = async (skillId, updateData) => {
  try {
    const skill = await Skill.findByPk(skillId);
    if (!skill) {
      throw new Error("Skill not found");
    }
    await skill.update(updateData);
    return skill;
  } catch (error) {
    throw new Error("Error updating skill: " + error.message);
  }
};

const deleteSkill = async (skillId) => {
  try {
    const skill = await Skill.findByPk(skillId);
    if (!skill) {
      throw new Error("Skill not found");
    }
    await skill.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting skill: " + error.message);
  }
};

const createResource = async (resourceData) => {
  try {
    const resource = await ResourceLibrary.create(resourceData);
    return resource;
  } catch (error) {
    throw new Error("Error creating resource: " + error.message);
  }
};

const getResourceById = async (resourceId) => {
  try {
    const resource = await ResourceLibrary.findByPk(resourceId, {
      include: [TrainingCourse],
    });
    return resource;
  } catch (error) {
    throw new Error("Error fetching resource: " + error.message);
  }
};

const getAllResources = async () => {
  try {
    const resources = await ResourceLibrary.findAll({
      include: [TrainingCourse],
    });
    return resources;
  } catch (error) {
    throw new Error("Error fetching all resources: " + error.message);
  }
};

const updateResource = async (resourceId, updateData) => {
  try {
    const resource = await ResourceLibrary.findByPk(resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }
    await resource.update(updateData);
    return resource;
  } catch (error) {
    throw new Error("Error updating resource: " + error.message);
  }
};

const deleteResource = async (resourceId) => {
  try {
    const resource = await ResourceLibrary.findByPk(resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }
    await resource.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting resource: " + error.message);
  }
};

const addSkillToTrainingCourse = async (courseId, skillId) => {
  try {
    const trainingSkill = await TrainingSkill.create({
      course_id: courseId,
      skill_id: skillId,
    });
    return trainingSkill;
  } catch (error) {
    throw new Error(
      "Error adding skill to training course: " + error.message
    );
  }
};

const removeSkillFromTrainingCourse = async (courseId, skillId) => {
  try {
    const result = await TrainingSkill.destroy({
      where: {
        course_id: courseId,
        skill_id: skillId,
      },
    });
    return result > 0;
  } catch (error) {
    throw new Error(
      "Error removing skill from training course: " + error.message
    );
  }
};

module.exports = {
  createTrainingCourse,
  getTrainingCourseById,
  getAllTrainingCourses,
  updateTrainingCourse,
  deleteTrainingCourse,
  createTrainingCategory,
  getTrainingCategoryById,
  getAllTrainingCategories,
  updateTrainingCategory,
  deleteTrainingCategory,
  createSkill,
  getSkillById,
  getAllSkills,
  updateSkill,
  deleteSkill,
  createResource,
  getResourceById,
  getAllResources,
  updateResource,
  deleteResource,
  addSkillToTrainingCourse,
  removeSkillFromTrainingCourse,
};