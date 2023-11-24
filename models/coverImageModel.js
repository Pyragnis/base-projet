// coverImageModel.js

'use strict';

import { Model, DataTypes } from 'sequelize';

export default  (sequelize) => {
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
