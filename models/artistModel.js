'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Artist extends Model {
    static associate(models) {
      Artist.hasMany(models.Album, { foreignKey: 'artist_id' });
      Artist.hasMany(models.Music, { foreignKey: 'artist_id' });
      Artist.hasOne(models.CoverImage, { foreignKey: 'artist_id' });
    }
  }

  Artist.init(
    {
      artist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Artist',
      tableName: 'artist',
    }
  );

  return Artist;
};
