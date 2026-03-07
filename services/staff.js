import Staff from "../models/staff.js";

export const createStaff = async (data) => {
  return await Staff.create(data);
};

export const getStaffs = async () => {
  return await Staff.find();
};

export const getStaffByAdmin = async (name) => {
  return await Staff.findOne({ name: name });
};

export const getStaff = async (id) => {
  return await Staff.findOne(id);
};

export const getCountOfStaff = async () => {
  const count = await Staff.countDocuments({ isAdmin: false });
  const active = await Staff.countDocuments({ status: "Active" });
  const onLeave = await Staff.countDocuments({ status: "Leave" });

  return { count, active, onLeave };
};

export const updateStaff = async (id, data) => {
  return await Staff.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteStaff = async (id) => {
  return await Staff.findOneAndDelete(id);
};
