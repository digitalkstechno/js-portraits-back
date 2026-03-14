import OutdoorOrder from "../models/order.js";
import OutdoorOrderBill from "../models/outerbill.js";
import ProductSell from "../models/productSell.js";
import StaffSalary from "../models/staffSalary.js";

export const getDetailedSummary = async (startDate, endDate) => {
  let dateFilter = {};

  // Agar dates hain, toh filter lagao, warna khali object rehne do (Lifetime Data)
  if (
    startDate &&
    endDate &&
    startDate !== "undefined" &&
    endDate !== "undefined"
  ) {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    dateFilter.date = { $gte: start, $lte: end };
  }

//   console.log("Running Query with Filter:", JSON.stringify(dateFilter));

  const getDues = async (Model, amountField, balanceField) => {
    const result = await Model.aggregate([
      { $match: dateFilter }, // Agar dateFilter {} hai, toh saara data aayega
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $toDouble: `$${amountField}` } },
          totalPending: { $sum: { $toDouble: `$${balanceField}` } },
        },
      },
    ]);
    return result[0] || { totalAmount: 0, totalPending: 0 };
  };

  const [orders, bills, sells, staffStatus] = await Promise.all([
    getDues(OutdoorOrder, "grandTotal", "balanceDue"),
    getDues(OutdoorOrderBill, "grandTotal", "balanceDue"),
    getDues(ProductSell, "grandTotal", "balanceDue"),
    StaffSalary.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            staffId: "$staffId",
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          paidAmount: { $sum: "$amount" },
          staffName: { $first: "$staffName" },
        },
      },
      // StaffStatus aggregation ke niche ye lookup add karein
      {
        $lookup: {
          from: "staffs", // Aapke staff collection ka naam
          localField: "_id.staffId",
          foreignField: "_id",
          as: "staffDetails",
        },
      },
      {
        $project: {
          staffName: 1,
          paidAmount: 1,
          actualSalary: { $arrayElemAt: ["$staffDetails.salary", 0] },
          pendingAmount: {
            $subtract: [
              { $arrayElemAt: ["$staffDetails.salary", 0] },
              "$paidAmount",
            ],
          },
        },
      },
    ]),
  ]);

  return { orders, bills, sells, staffStatus };
};
