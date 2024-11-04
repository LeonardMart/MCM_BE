"use strict";

module.exports = (sequelize, DataTypes) => {
  const Showtime = sequelize.define("Showtime", {
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    filmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "films",
        key: "id",
      },
    },
  });

  Showtime.associate = (models) => {
    Showtime.hasMany(models.ticket, {
      foreignKey: "showtimeId",
      as: "tickets",
    });
    Showtime.belongsTo(models.film, {
      foreignKey: "filmId",
      as: "film",
    });
  };

  return Showtime;
};
