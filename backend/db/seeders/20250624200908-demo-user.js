'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Yitian',
        lastName: 'Qian',
        email: 'yitian@user.io',
        username: 'yitian',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Shir Hussain',
        lastName: 'Tabesh',
        email: 'shir@user.io',
        username: 'shir',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Henry',
        lastName: 'Tang',
        email: 'henry@user.io',
        username: 'henry',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Hermanth',
        lastName: 'Nava',
        email: 'hermanth@user.io',
        username: 'hermanth',
        hashedPassword: bcrypt.hashSync('password4')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['yitian', 'shir', 'henry', 'hermanth'] }
    }, {});
  }
};

// Original code
// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
