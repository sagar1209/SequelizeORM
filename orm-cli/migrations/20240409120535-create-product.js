'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      discription: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      status:{
          type:Sequelize.ENUM("active","inactive"),
          defaultValue:"active"

      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue:Sequelize.literal('CURREN_TIMESTAMP')
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue:Sequelize.literal('CURREN_TIMESTAMP')
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};