import OutdoorPayment from "../models/outdoorPartyPayment.js";

export const save = async (data) => {
  const count = await OutdoorPayment.countDocuments();
  const transNo = `${(count + 1).toString()}`;
  const newQuotation = new OutdoorPayment({
    ...data,
    transNo,
  });

  return await newQuotation.save();
};

export const getPayments = async () => {
  return await OutdoorPayment.find();
};

export const getByParty = async (id) => {
  return await OutdoorPayment.findById(id);
};

export const getCountOfPayments = async () => {
  const count = await OutdoorPayment.countDocuments();
  return count;
};

export const deletepayment = async (id) => {
  return await OutdoorPayment.findByIdAndDelete(id);
};
