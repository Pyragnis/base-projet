'use strict';
const { faker } = require('@faker-js/faker');
const sequelize = require('../config/db'); // Assuming correct path
const { Album, Music, CoverImage } = require('../models');
const { Artist } = require('../models/artistModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await sequelize.authenticate();

    await queryInterface.sequelize.query('SET search_path to your_schema, public');


    // Seed Artist table
    const artistsData = Array.from({ length: 5 }, () => ({
      name: 'Your Artist Name', // Replace with your data
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Artist.bulkCreate(artistsData, { returning: true });

    // Seed Album table
    const albumsData = Array.from({ length: 10 }, () => ({
      title: 'Your Album Title', // Replace with your data
      artist_id: 1, // Assuming there is an artist with ID 1
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Album.bulkCreate(albumsData);

    // Seed Music table
    const musicsData = Array.from({ length: 20 }, () => ({
      title: 'Your Music Title', // Replace with your data
      duration: 180, // Replace with your data
      album_id: 1, // Assuming there is an album with ID 1
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Music.bulkCreate(musicsData, { returning: true });

    // Seed CoverImage table
    const coverImagesData = Array.from({ length: 5 }, () => ({
      url: 'Your Image URL', // Replace with your data
      artist_id: 1, // Assuming there is an artist with ID 1
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await CoverImage.bulkCreate(coverImagesData, { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Implement down logic if needed
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed Artist table
    const artistsData = Array.from({ length: 5 }, () => ({
      name: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Artist.bulkCreate(artistsData);

    // Seed Album table
    const albumsData = Array.from({ length: 10 }, () => ({
      title: faker.lorem.words(),
      artist_id: Math.floor(Math.random() * 5) + 1, // Assuming there are 5 artists
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Album.bulkCreate(albumsData);

    // Seed Music table
    const musicsData = Array.from({ length: 20 }, () => ({
      title: faker.lorem.words(),
      duration: Math.floor(Math.random() * 300) + 60, // Random duration between 1 to 5 minutes
      album_id: Math.floor(Math.random() * 10) + 1, // Assuming there are 10 albums
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Music.bulkCreate(musicsData, { returning: true });

    // Seed CoverImage table
    const coverImagesData = Array.from({ length: 5 }, () => ({
      url: faker.image.imageUrl(),
      album_id: Math.floor(Math.random() * 10) + 1, // Assuming there are 10 albums
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await CoverImage.bulkCreate(coverImagesData, { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Implement down logic if needed
  },
};
