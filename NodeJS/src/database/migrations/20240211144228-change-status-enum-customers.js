/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("customers", "status", {
      type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn("customers", "status", {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
    });
  },
};
