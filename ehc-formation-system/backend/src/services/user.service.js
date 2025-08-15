const { User, Company, Role } = require('../models');
const bcrypt = require('bcryptjs');

const userService = {
  /**
   * Create a new user.
   * @param {object} userData - User data.
   * @returns {Promise<User>} Created user.
   */
  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password_hash: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  /**
   * Get a user by ID.
   * @param {number} userId - User ID.
   * @returns {Promise<User>} User object.
   */
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        include: [
          { model: Company },
          { model: Role, through: 'user_roles' }
        ]
      });
      return user;
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message);
    }
  },

  /**
   * Get all users.
   * @returns {Promise<User[]>} List of users.
   */
  async getAllUsers() {
    try {
      const users = await User.findAll({
        include: [
          { model: Company },
          { model: Role, through: 'user_roles' }
        ]
      });
      return users;
    } catch (error) {
      throw new Error('Error fetching all users: ' + error.message);
    }
  },

  /**
   * Update a user by ID.
   * @param {number} userId - User ID.
   * @param {object} updateData - Data to update.
   * @returns {Promise<User>} Updated user.
   */
  async updateUser(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (updateData.password) {
        updateData.password_hash = await bcrypt.hash(updateData.password, 10);
        delete updateData.password;
      }
      await user.update(updateData);
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  },

  /**
   * Delete a user by ID.
   * @param {number} userId - User ID.
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  },
};

module.exports = userService;