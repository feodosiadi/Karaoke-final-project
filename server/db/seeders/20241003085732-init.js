'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'test@test.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    const genres = await queryInterface.bulkInsert(
      'Genres',
      [
        {
          name: 'Шансон',
          img: 'img/krug.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Всякое',
          img: 'img/trofim.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
    );

    await queryInterface.bulkInsert(
      'Songs',
      [
        {
          name: 'Девочка-пай',
          minus: '/song/minus/Девочка-пай-minus.mp3',
          acapella: '/song/acapello/Девочка-пай-acapella.wav',
          subtitles: '/song/subtitles/Девочка-пай-subtitles.srt',
          img: '/song/img/devochka-pie.PNG',
          genreId: genres[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Город-Сочи',
          minus: '/song/minus/Город-Сочи-minus.mp3',
          acapella: '/song/acapello/Город-Сочи-acapella.wav',
          subtitles: '/song/subtitles/Город-Сочи-subtitles.srt',
          img: '/song/img/gorod-sochi.PNG',
          genreId: genres[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Champions',
          minus: '/song/minus/Champions-minus.mp3',
          acapella: '/song/acapello/Champions-acapella.wav',
          subtitles: '/song/subtitles/Champions-subtitles.srt',
          img: '/song/img/champions.PNG',
          genreId: genres[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Country-roads',
          minus: '/song/minus/Country-roads-minus.mp3',
          acapella: '/song/acapello/Country-roads-acapella.wav',
          subtitles: '/song/subtitles/Country-roads-subtitles.srt',
          img: '/song/img/roads.PNG',
          genreId: genres[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vladimirskij-central',
          minus: '/song/minus/Vladimirskij-central-minus.mp3',
          acapella: '/song/acapello/Vladimirskij-central-acapella.wav',
          subtitles: '/song/subtitles/Vladimirskij-central-subtitles.srt',
          img: '/song/img/central.PNG',
          genreId: genres[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Songs', null, {});
    await queryInterface.bulkDelete('Genres', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
