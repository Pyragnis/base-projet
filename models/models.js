import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const CoverImage = sequelize.define(
  "CoverImage",
  {
    cover_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
    },
    music_id: {
      type: DataTypes.INTEGER,
    },
    album_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CoverImage",
    tableName: "cover_image",
  }
);

export const Album = sequelize.define(
  "Album",
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
    release_date: {
      type: DataTypes.DATE,
    },
    genre: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    artist_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Album",
    tableName: "album",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export const Artist = sequelize.define(
  "Artist",
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
    bio: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Artist",
    tableName: "artist",
  }
);

export const Music = sequelize.define(
  "Music",
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
    artist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Artist,
        key: "artist_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    album_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Album,
        key: "album_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    listening_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    modelName: "Music",
    tableName: "music",
    sequelize,
  }
);

Music.belongsTo(Artist, { foreignKey: "artist_id", as: "Artist" });
Music.belongsTo(Album, { foreignKey: "album_id", as: "Album", allowNull: true });
Music.hasOne(CoverImage, { foreignKey: "music_id", as: "CoverImage" });

Album.belongsTo(Artist, { foreignKey: "artist_id" });
Album.hasMany(Music, { foreignKey: "album_id" });

CoverImage.belongsTo(Artist, { foreignKey: "artist_id" });
CoverImage.belongsTo(Music, { foreignKey: "music_id", as: "Music" });
CoverImage.belongsTo(Album, { foreignKey: "album_id" });
