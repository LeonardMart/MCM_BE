"use strict";

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    seatRow: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Showtimes",
        key: "id",
      },
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.showtime, {
      foreignKey: "showtimeId",
      as: "showtime",
    });
  };

  return Ticket;
};
