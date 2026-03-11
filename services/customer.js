import Customer from "../models/customer.js";

export const createCustomer = async (data) => {
  return await Customer.create(data);
};

export const getCustomers = async () => {
  return await Customer.find();
};

export const getCustomerByName = async (name) => {
  return await Customer.findOne({ name });
};

export const updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};
