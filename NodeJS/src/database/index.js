import { Sequelize } from "sequelize";

import config from "../config/database";

import Contacts from "../app/models/Contact";
import User from "../app/models/User";
import Customers from "../app/models/Customer";

const models = [Customers, Contacts, User];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) model.associate(this.connection.models);
    });
  }
}

export default new Database();
