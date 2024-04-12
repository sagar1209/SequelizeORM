'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Emails', [{
        emailAddress : 'senjaliya@gmail.com',
        userId :1,
     },{
      emailAddress : 'sakariya@gmail.com',
      userId :2,
     },{
      emailAddress : 'gundaliya@gmail.com',
      userId :3,
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Emails', null, {});
  }
};
