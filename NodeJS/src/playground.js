import { Op } from "sequelize";

import "./database";
import Customer from "./app/models/Customer";
import Contact from "./app/models/Contact";

class Playground {
  static async play() {
    /* const customers = await Customer.scope(["active", "name"]).findAll(); */

    const customers = await Customer.scope([
      "active",
      {
        method: ["created", new Date(2023, 1, 1)],
      },
    ]).findAll({
      include: [
        {
          model: Contact,
          where: {
            status: "ACTIVE",
          },
          required: false,
        },
      ],
      [Op.or]: {
        where: {
          status: {
            [Op.in]: ["ARCHIVED", "ACTIVE"],
          },
          name: {
            [Op.like]: "Dev%",
          },
        },
        createdAt: {
          [Op.lte]: new Date(),
        },
      },
      order: [["createdAt", "DESC"]],
      limit: 2,
      offset: 2 * 1 - 2,
    });
    console.log(JSON.stringify(customers, null, 2));
  }
}

Playground.play();
