import PrintSetting from "../models/printSettings.js";

export const fetchProfile = async () => {
  return await PrintSetting.findOne();
};

export const saveOrUpdateProfile = async (data) => {
  return await PrintSetting.findOneAndUpdate({}, data, {
    upsert: true,
    returnDocument: "after",
  });
};
