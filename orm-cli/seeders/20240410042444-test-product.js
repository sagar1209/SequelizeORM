const faker = require('faker');

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const items = generateData(100);
    await queryInterface.bulkInsert('products', items, {}); // Remove square brackets around items
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};

function generateData(rowsCounts) {
  const data = [];

  for (let i = 0; i < rowsCounts; i++) {
    const newItem = {
      name: faker.commerce.productName(),
      discription: "This is a test content for product " + (i + 1), // Corrected typo
      amount: +faker.commerce.price(),
      status: faker.random.arrayElement(["active", "inactive"]),
    }
    data.push(newItem);
  }
  return data;
}
