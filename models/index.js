import { Artist, Album, Music, CoverImage } from "./models";

Artist.hasMany(Album, { foreignKey: "artist_id" });
Artist.hasMany(Music, { foreignKey: "artist_id" });
Artist.hasOne(CoverImage, { foreignKey: "artist_id" });

CoverImage.belongsTo(Artist, { foreignKey: "artist_id" });
CoverImage.belongsTo(Music, { foreignKey: "music_id", as: "Music" });
CoverImage.belongsTo(Album, { foreignKey: "album_id" });

Music.belongsTo(Artist, { foreignKey: "artist_id", as: "Artist" });
Music.belongsTo(Album, { foreignKey: "album_id", as: "Album" });
Music.hasOne(CoverImage, { foreignKey: "music_id", as: "CoverImage" });

Album.belongsTo(Artist, { foreignKey: "artist_id" });
Album.hasMany(Music, { foreignKey: "album_id" });
