import {
  createCustomer,
  getCustomerByName,
  getCustomers,
  updateCustomer,
} from "../services/customer.js";

export const createCustomerHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const exist = await getCustomerByName(name);
    if (exist) {
      return res
        .status(404)
        .json({ message: "Outdoor party already exist with this name" });
    }

    const customer = await createCustomer(req.body);

    return res.status(201).json({
      message: "Outdoor party created successfully",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating outdoor party",
      error: error.message,
    });
  }
};

export const getCustomerHandler = async (req, res) => {
  try {
    const customers = await getCustomers();
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCustomerHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await updateCustomer(id, req.body);
    if (customer) {
      return res
        .status(200)
        .json({ message: "Customer updated successfully", customer });
    } else {
      return res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Customer not found" });
  }
};
