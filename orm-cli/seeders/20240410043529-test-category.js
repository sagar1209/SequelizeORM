'use strict';
const faker = require('faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateData(100);
    await queryInterface.bulkInsert('Categories', items, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Categories', null, {});
  }
};

function generateData(rowsCounts) {
  const data = [];

  for (let i = 0; i < rowsCounts; i++) {
    const newItem = {
      name: faker.commerce.department(),
      categoryImage : faker.image.imageUrl(),
      status: faker.random.arrayElement([1,0]),
    }
    data.push(newItem);
  }
  return data;
}
