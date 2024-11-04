"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      showtimeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "showtimes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      seatRow: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seatNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    }, {
      tableName: "tickets",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    await queryInterface.dropTable("tickets");
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
