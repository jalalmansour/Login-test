'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('adminpassword', 10);

    await queryInterface.bulkInsert('users', [
      {
        company_id: null, // Assuming admin might not be tied to a specific company initially
        email: 'admin@ehc.com',
        password_hash: hashedPassword,
        first_name: 'EHC',
        last_name: 'Admin',
        phone: null,
        is_active: true,
        last_login: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company_id: 1, // Assuming company with ID 1 exists
        email: 'rrh@client.com',
        password_hash: await bcrypt.hash('rrhpassword', 10),
        first_name: 'Client',
        last_name: 'RRH',
        phone: '123-456-7890',
        is_active: true,
        last_login: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company_id: 1, // Assuming company with ID 1 exists
        email: 'employee@client.com',
        password_hash: await bcrypt.hash('employeepassword', 10),
        first_name: 'Client',
        last_name: 'Employee',
        phone: '987-654-3210',
        is_active: true,
        last_login: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};