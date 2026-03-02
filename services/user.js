import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const createUser = async (data) => {
  const { name, email, password, role } = data;

  const pass = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, pass);

  const user = User.create({
    name: name,
    email: email,
    password: hashedPass,
    role: role,
  });

  return user;
};

export const getUsers = async () => {
  return await User.find();
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUser = async (id) => {
  return await User.findOne(id);
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteUser = async (id) => {
  return await User.findOneAndDelete(id);
};
