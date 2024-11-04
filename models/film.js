"use strict";

module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define("Film", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    studioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "studios",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  Film.associate = (models) => {
    Film.hasMany(models.showtime, {
      foreignKey: "filmId",
      as: "showtimes",
    });
    Film.belongsTo(models.studio, {
      foreignKey: "studioId",
      as: "studio",
    });
  };

  return Film;
};
