"use strict";

module.exports = (sequelize, DataTypes) => {
  const Studio = sequelize.define("Studio", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Studio.associate = (models) => {
    console.log("tes1")
    Studio.hasMany(models.film, {
      foreignKey: "studioId",
      as: "films",
    });
  };

  return Studio;
};
