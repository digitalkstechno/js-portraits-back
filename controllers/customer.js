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

    const role = await createCustomer(req.body);

    return res.status(201).json({
      message: "Outdoor party created successfully",
      role,
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
    const roles = await getCustomers();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCustomerHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await updateCustomer(id, req.body);
    if (role) {
      return res
        .status(200)
        .json({ message: "Customer updated successfully", role });
    } else {
      return res.status(404).json({ message: "Customer" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Customer not found" });
  }
};
