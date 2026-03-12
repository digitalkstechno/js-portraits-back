import OutdoorPayment from "../models/outdoorPartyPayment.js";

export const save = async (data) => {
  const count = await OutdoorPayment.countDocuments();
  const transNo = `${(count + 1).toString()}`;

  // 2. Naya Payment object banana
  const newPayment = new OutdoorPayment({
    ...data,
    transNo,
  });

  const savedPayment = await newPayment.save();
  if (savedPayment) {
    await OutdoorPayment.updateMany(
      { orderNo: data.orderNo }, 
      {
        $inc: {
          orderTotalPaidAmt: data.amount,
          orderTotalPendingAmt: -data.amount, 
        },
      },
    );
  }

  return savedPayment;
};

export const getPayments = async () => {
  return await OutdoorPayment.find().populate("outdoorParty");
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
