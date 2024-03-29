// migrations/20231123093134-create-cover-image.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cover_image', {
      cover_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      music_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'music',
          key: 'music_id',
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
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('cover_image');
  },
};
