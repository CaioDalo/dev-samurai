/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface) {
    return queryInterface.removeColumn("users", "provider");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn("users", "provider", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    });
  },
};
