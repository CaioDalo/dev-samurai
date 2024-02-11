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
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }
}

export default new Database();
