import Role from "../models/role.js";

export const createRole = async (data) => {
  return await Role.create(data);
};

export const getRoles = async () => {
  return await Role.find();
};

export const getRoleById = async (id) => {
  return await Role.findById(id);
};

export const getRoleByName = async (name) => {
  return await Role.findOne({ name });
};

export const updateRole = async (id, data) => {
  return await Role.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

export const deleteRole = async (id) => {
  return await Role.findByIdAndDelete(id);
};
