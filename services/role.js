import role from "../models/role.js";

export const createRole = async (data) => {
  return await role.create(data);
};

export const getRoles = async () => {
  return await role.find();
};

export const getRoleById = async (id) => {
  return await role.findById(id);
};

export const updateRole = async (id, data) => {
  return await role.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteRole = async (id) => {
  return await role.findByIdAndDelete(id);
};
