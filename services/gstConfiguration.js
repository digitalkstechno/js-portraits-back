import GstConfigure from "../models/gstConfiguration.js";

export const getGstData = async () => {
  return await GstConfigure.findOne();
};

export const saveOrUpdateGst = async (data) => {
  return await GstConfigure.findOneAndUpdate({}, data, {
    upsert: true,
    new: true,
  });
};
