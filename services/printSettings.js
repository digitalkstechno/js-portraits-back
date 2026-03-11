import PrintSetting from "../models/printSettings.js";

export const fetchPrintSettings = async () => {
  return await PrintSetting.findOne();
};

export const saveOrUpdatePrintSettings = async (data) => {
  return await PrintSetting.findOneAndUpdate({}, data, {
    upsert: true,
    returnDocument: "after",
  });
};
