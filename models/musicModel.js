  
  CREATE TABLE music (
    music_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INT REFERENCES artist(artist_id),
    album_id INT REFERENCES album(album_id),
    file_path VARCHAR(255) NOT NULL
  );
  