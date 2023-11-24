'use strict';

import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.Artist, { foreignKey: 'artist_id' });
      Album.hasMany(models.Music, { foreignKey: 'album_id' });
      Album.hasOne(models.CoverImage, { foreignKey: 'album_id' }); // Associate with CoverImage
    }
  }

  Album.init(
    {
      album_id: {
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
      modelName: 'Album',
      tableName: 'album',
    }
  );

  return Album;
};
