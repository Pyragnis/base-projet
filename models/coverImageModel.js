// coverImageModel.js

'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CoverImage extends Model {
    static associate(models) {
      CoverImage.belongsTo(models.Album, { foreignKey: 'album_id' });
      CoverImage.belongsTo(models.Music, { foreignKey: 'music_id' });
    }
  }

  CoverImage.init(
    {
      cover_image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CoverImage',
      tableName: 'cover_image',
    }
  );

  return CoverImage;
};
