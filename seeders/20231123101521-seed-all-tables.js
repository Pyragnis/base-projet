'use strict';
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { faker } = require('@faker-js/faker');
const axios = require('axios');

const readFileAsync = promisify(fs.readFile);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Function to generate a random artist using your API
    const createRandomArtist = async () => {
      try {
        const response = await axios.post('your-api-endpoint-for-creating-artist', {
          name: faker.internet.userName(),
          bio: faker.lorem.paragraph(),
        });
        return response.data.artist_id;
      } catch (error) {
        console.error('Error creating artist:', error.message);
        throw error;
      }
    };

    // Seed Artist table and get artist IDs
    const artistIds = await Promise.all(
      Array.from({ length: 5 }, async () => await createRandomArtist())
    );

    // Seed Album table and get album IDs
    const albumIds = await queryInterface.bulkInsert(
      'album',
      Array.from({ length: 10 }, () => ({
        title: faker.lorem.words(),
        artist_id: faker.random.arrayElement(artistIds),
        release_date: faker.date.past(),
        genre: faker.lorem.word(),
        description: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      { returning: ['album_id'] }
    );

    // Seed Music table
    const musicsData = Array.from({ length: 20 }, () => ({
      title: faker.lorem.words(),
      file_path: '', // Add logic to read audio files from a folder and set the file_path
      artist_id: faker.random.arrayElement(artistIds),
      album_id: faker.random.arrayElement(albumIds).album_id,
      listening_count: faker.datatype.number(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('music', musicsData, {});

    // Seed CoverImage table
    const coverImagesData = Array.from({ length: 5 }, async () => {
      const url = faker.image.imageUrl();
      const albumId = faker.random.arrayElement(albumIds).album_id;
      const musicId = faker.random.arrayElement(musicsData).music_id;

      // Upload cover image and get cover_id
      const coverId = await uploadCoverImage(url, albumId, musicId);

      return {
        url,
        album_id: albumId,
        music_id: musicId,
        cover_id: coverId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('cover_image', coverImagesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Implement down logic if needed
  },
};
