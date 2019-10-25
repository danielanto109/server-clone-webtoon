'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'admin@gmail.com',
        password: 'rahasia',
        name: 'Ademin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jhon.doe@gmail.com',
        password: 'secret',
        name: 'Jhon Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};