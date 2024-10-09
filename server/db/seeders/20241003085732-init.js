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

    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Артём Легенда Кулик',
          email: 'test@test.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Павел Иванович Д',
          email: 'darasov@curd.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Юля Павлова',
          email: 'elbrus1@elbrus.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Георгий Бабаян',
          email: 'elbrus@elbrus.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Алексей Сидоров',
          email: 'elbrus2@elbrus.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Дарья Левченко',
          email: 'elbrus5@elbrus.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Юрий Плисковский',
          email: 'elbrus6@elbrus.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Александр Ворона',
          email: 'elbrus9@elbrus.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Юлия Лапикова',
          email: 'elbrus12@elbrus.com',
          password: await bcrypt.hash('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
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

    const songs = await queryInterface.bulkInsert(
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
          acapella: '/song/acapello/city-sochi-acapella.wav',
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
      { returning: true },
    );

    await queryInterface.bulkInsert(
      'Records',
      [
        {
          record: '/empty',
          userId: users[2].id,
          songId: songs[2].id,
          score: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          record: '/empty',
          userId: users[1].id,
          songId: songs[3].id,
          score: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          record: '/empty',
          userId: users[3].id,
          songId: songs[4].id,
          score: 65,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          record: '/empty',
          userId: users[4].id,
          songId: songs[2].id,
          score: 81,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          record: '/empty',
          userId: users[5].id,
          songId: songs[2].id,
          score: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          record: '/empty',
          userId: users[6].id,
          songId: songs[2].id,
          score: 87,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          record: '/empty',
          userId: users[7].id,
          songId: songs[2].id,
          score: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          record: '/empty',
          userId: users[8].id,
          songId: songs[2].id,
          score: 88,
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
    await queryInterface.bulkDelete('Records', null, {});
  },
};
