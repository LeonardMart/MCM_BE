"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "showtimes",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        time: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        filmId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "films",
            key: "id",
          },
          onUpdate: "CASCADE",
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
        tableName: "showtimes",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    await queryInterface.dropTable("showtimes");
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
