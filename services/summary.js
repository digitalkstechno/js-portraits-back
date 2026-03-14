import OutdoorOrder from "../models/order.js";
import OutdoorOrderBill from "../models/outerbill.js";
import ProductPurchase from "../models/productPurchase.js";
import ProductSell from "../models/productSell.js";
import StaffSalary from "../models/StaffSalary.js";

export const getSummary = async (startDate, endDate) => {
  // 1. Improved Date Filter Logic (Handles time range to cover full day)
  let dateFilter = {};

  if (startDate && endDate) {
    // String format ko maintain rakhte hue date range banana
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    dateFilter.date = {
      $gte: start,
      $lte: end,
    };
  }
//   console.log("Final Mongo Filter:", JSON.stringify(dateFilter));

  // 2. Optimized Helper function for Aggregation
  const getAggregateSum = async (Model, fieldName, filter) => {
    try {
      const result = await Model.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: `$${fieldName}` } } },
      ]);
      return result[0]?.total || 0;
    } catch (err) {
      console.error(`Error aggregating ${Model.modelName}:`, err);
      return 0;
    }
  };

  // 3. Parallel Execution (Efficiency)
  const [orders, bills, salaries, purchases, productSells] = await Promise.all([
    getAggregateSum(OutdoorOrder, "grandTotal", dateFilter),
    getAggregateSum(OutdoorOrderBill, "grandTotal", dateFilter),
    getAggregateSum(StaffSalary, "amount", dateFilter),
    getAggregateSum(ProductPurchase, "grandTotal", dateFilter),
    getAggregateSum(ProductSell, "grandTotal", dateFilter),
  ]);

  // 4. Financial Calculations
  // Total Revenue = Orders + Bills + Direct Product Sales
  const totalRevenue = orders + bills + productSells;

  // Total Spend = Salaries + Product Purchases
  const totalSpend = salaries + purchases;

  return {
    revenue: {
      fromOrders: orders,
      fromBills: bills,
      fromProductSells: productSells,
      totalRevenue,
    },
    expenses: {
      staffSalaries: salaries,
      stockPurchases: purchases,
      totalSpend,
    },
    netProfit: totalRevenue - totalSpend,
    stats: {
      profitMargin:
        totalRevenue > 0
          ? ((totalRevenue - totalSpend) / totalRevenue) * 100
          : 0,
    },
    filterApplied: !!(startDate || endDate),
  };
};
