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
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'И всякое',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {returning: true},
    );

    await queryInterface.bulkInsert(
      'Songs',
      [
        {
          name: 'Девочка-пай',
          minus: 'song/minus/Девочка+пай+minus_out.mp3',
          acapella: 'song/acapello/Девочка пай acapella.mp3',
          text: `В тебе было столько желанья,
          И месяц над нами светил
          Когда по маляве, придя на свидание
          Я розы тебе подарил
          Какой ты казалась серьёзной
          Качала в ответ головой
          Когда я сказал, что отнял эти розы
          В киоске на Первой Ямской

          Как было тепло
          Что нас с тобой вместе свело
          Девочка-пай, рядом жиган
          И хулиган
          В нашей Твери нету таких
          Даже среди шкур центровых
          Девочка-пай, ты не грусти
          И не скучай`,
          img: 'song/img/devochka-pie.jpg',
          genreId: genres[0].id ,
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
