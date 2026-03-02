import Staff from "../models/staff.js";

export const createStaff = async (data) => {
  return await Staff.create(data);
};

export const getStaffs = async () => {
  return await Staff.find();
};

export const getStaffByEmail = async (email) => {
  return await Staff.findOne({ email });
};

export const getStaff = async (id) => {
  return await Staff.findOne(id);
};

export const updateStaff = async (id, data) => {
  return await Staff.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteStaff = async (id) => {
  return await Staff.findOneAndDelete(id);
};
