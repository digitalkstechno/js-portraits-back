import OutdoorPayment from "../models/outdoorPartyPayment.js";

export const save = async (data) => {
  return await OutdoorPayment.create(data);
};

export const getPayments = async () => {
  return await OutdoorPayment.find();
};

export const getByParty = async (id) => {
  return await OutdoorPayment.findById(id);
};

export const deletepayment = async (id) => {
    return await OutdoorPayment.findByIdAndDelete(id);
};
