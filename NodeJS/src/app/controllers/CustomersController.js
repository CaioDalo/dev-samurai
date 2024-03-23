import Customer from "../models/Customer";

const customers = [
  {
    id: 1,
    name: "John Doe",
    site: "https://johndoe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    site: "https://janedoe.com",
  },
  {
    id: 3,
    name: "John Smith",
    site: "https://johnsmith.com",
  },
];

class CustomersController {
  // GET /customers
  async index(req, res) {
    const data = await Customer.findAll();
    if (!data) {
      return res.status(404).json({ error: "No customers found" });
    }
    return res.status(200).json(data);
  }

  // GET /customers/:id
  async show(req, res) {
    const id = parseInt(req.params.id, 10);
    const customerToShow = await Customer.findByPk(id);
    const status = customerToShow ? 200 : 404;

    return res
      .status(status)
      .json(customerToShow || { error: "Customer not found" });
  }

  // POST /customers
  create(req, res) {
    const { name, site } = req.body;
    const id = customers[customers.length - 1].id + 1;
    const status = name && site ? 201 : 400;

    const newCustomer = {
      id,
      name,
      site,
    };

    customers.push(newCustomer);

    return res
      .status(status)
      .json(
        status === 201
          ? newCustomer
          : { error: "Name and website are required" }
      );
  }

  // PUT /customers/:id
  update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name, site } = req.body;
    const index = customers.findIndex((customer) => customer.id === Number(id));
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers[index] = { id: Number(id), name, site };
    }

    return res
      .status(status)
      .json(index >= 0 ? customers[index] : { error: "Customer not found" });
  }

  // DELETE /customers/:id
  destroy(req, res) {
    const id = parseInt(req.params.id, 10);
    const index = customers.findIndex((customer) => customer.id === Number(id));
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers.splice(index, 1);
    }

    return res
      .status(status)
      .json(
        index >= 0
          ? { success: "Customer deleted" }
          : { error: "Customer not found" }
      );
  }
}

export default new CustomersController();
