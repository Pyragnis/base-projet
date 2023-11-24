'use strict';
import { faker } from ('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed Artist table
    const artistsData = Array.from({ length: 5 }, () => ({
      name: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('artist', artistsData, {});

    // Seed Album table
    const albumsData = Array.from({ length: 10 }, () => ({
      title: faker.lorem.words(),
      artist_id: Math.floor(Math.random() * 5) + 1, // Assuming there are 5 artists
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('album', albumsData, {});

    // Seed Music table
    const musicsData = Array.from({ length: 20 }, () => ({
      title: faker.lorem.words(),
      file_path: '',
      album_id: Math.floor(Math.random() * 10) + 1, // Assuming there are 10 albums
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('music', musicsData, {});

    // Seed CoverImage table
    const coverImagesData = Array.from({ length: 5 }, () => ({
      url: faker.image.imageUrl(),
      album_id: Math.floor(Math.random() * 10) + 1, // Assuming there are 10 albums
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('cover_image', coverImagesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Implement down logic if needed
  },
};
