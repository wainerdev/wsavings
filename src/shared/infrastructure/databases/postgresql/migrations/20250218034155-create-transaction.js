'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the referenced table
          key: 'id', // Column in the referenced table
        },
        onUpdate: 'CASCADE', // Ensure that updates to userId in users table are reflected
        onDelete: 'CASCADE', // Automatically delete transactions if the associated user is deleted
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories', // Name of the referenced table
          key: 'id', // Column in the referenced table
        },
        onUpdate: 'CASCADE', // Ensure that updates to userId in users table are reflected
        onDelete: 'CASCADE', // Automatically delete transactions if the associated user is deleted
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['I', 'E'], // I = Income, E = Expense
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};