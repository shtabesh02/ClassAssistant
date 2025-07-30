'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Announcement } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Announcement.bulkCreate([
      {
        subject: 'Final exam',
        msg: 'Dear students, the final exam is set to be on Aug 7th.'
      },
      {
        subject: 'Group presentation',
        msg: 'Your group presentation is held on Aug 5th.'
      },

    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Announcements';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      subject: { [Op.in]: ['Final exam'] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
