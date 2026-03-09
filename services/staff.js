import Staff from "../models/staff.js";

export const createStaff = async (data) => {
  return await Staff.create(data);
};

export const getStaffs = async (searchName, page, limit) => {
  const skip = (page - 1) * limit;

  // Query object: Hamesha non-admin staff hi dikhayein
  let query = { isAdmin: false };

  // Agar search term hai toh name par regex lagayein
  if (searchName) {
    query.name = { $regex: searchName, $options: "i" };
  }

  // Parallel execution: Data aur Count dono ek saath fetch karein
  const [data, total] = await Promise.all([
    Staff.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip),
    Staff.countDocuments(query),
  ]);

  return { data, total };
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
