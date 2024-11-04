// migrations/20231102100000-create-studio.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "studios",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        capacity: {
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
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ),
        },
      },
      {
        tableName: "studios",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    await queryInterface.dropTable("studios");
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
