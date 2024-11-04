"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "films",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        genre: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        duration: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        studioId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "studios",
            key: "id",
          },
          onDelete: "CASCADE",
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
        tableName: "films",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    await queryInterface.dropTable("films");
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
