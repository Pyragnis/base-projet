'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('music', {
      music_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      artist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'artist',
          key: 'artist_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      album_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'album',
          key: 'album_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Updated to SET NULL for optional relationship
        allowNull: true, // Added to explicitly allow null
      },
      listening_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('music', 'listening_count');
    await queryInterface.dropTable('music');
  },
};
