'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Music extends Model {
    static associate(models) {
      Music.belongsTo(models.Artist, { foreignKey: 'artist_id' });
      Music.belongsTo(models.Album, { foreignKey: 'album_id' });
      Music.hasOne(models.CoverImage, { foreignKey: 'music_id' });
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
    },
    {
      sequelize,
      modelName: 'Music',
      tableName: 'music',
    }
  );

  return Music;
};
