'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    static associate(models) {
      Music.belongsTo(models.Artist, { foreignKey: 'artist_id' });
      Music.belongsTo(models.Album, { foreignKey: 'album_id' });
    }
  }

  Music.init(
    {
      music_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Music',
      tableName: 'music',
    }
  );

  return Music;
};

