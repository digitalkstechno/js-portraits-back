import Terms from "../models/terms&conditions.js";

export const getTermsData = async () => {
  return await Terms.findOne({ settingsName: "GlobalTerms" });
};

export const saveOrUpdateTerms = async (termsArray, user) => {
  return await Terms.findOneAndUpdate(
    { settingsName: "GlobalTerms" },
    {
      conditions: termsArray,
      lastUpdatedBy: user,
    },
    { upsert: true, new: true },
  );
};
