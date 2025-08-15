const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models'); // Assuming you have User and Role models
const { jwtSecret } = require('../config/jwt'); // Assuming you have JWT configuration

const authService = {
  async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create the user
      const newUser = await User.create({
        email: userData.email,
        password_hash: hashedPassword,
        first_name: userData.firstName,
        last_name: userData.lastName,
        // Assign a default role, e.g., 'employee'
        // You might need to fetch the role_id from the roles table
        role_id: (await Role.findOne({ where: { role_name: 'employee' } }))?.role_id,
        company_id: userData.companyId || null, // Assuming company_id can be null initially
        is_active: true,
      });

      // Exclude password hash from the returned user object
      const userWithoutPassword = newUser.toJSON();
      delete userWithoutPassword.password_hash;

      return userWithoutPassword;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  async login(email, password) {
    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user.user_id, email: user.email, roleId: user.role_id },
        jwtSecret,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Exclude password hash from the returned user object
      const userWithoutPassword = user.toJSON();
      delete userWithoutPassword.password_hash;

      return { user: userWithoutPassword, token };
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },
};

module.exports = authService;