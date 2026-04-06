const Transaction = require("../models/Transaction.model");

const buildScopeMatch = (req) => {
  const match = {};

  if (req.user.role !== "admin") {
    match.userId = req.user.id;
  }

  return match;
};

const buildDateMatch = (req) => {
  const { startDate, endDate } = req.query;
  if (!startDate && !endDate) return {};

  const date = {};
  if (startDate) date.$gte = startDate;
  if (endDate) date.$lte = endDate;
  return { date };
};

const getSummary = async (req, res, next) => {
  try {
    const pipeline = [];
    const match = {
      ...buildScopeMatch(req),
      ...buildDateMatch(req)
    };

    if (Object.keys(match).length) pipeline.push({ $match: match });

    const result = await Transaction.aggregate([
      ...pipeline,
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let income = 0;
    let expense = 0;

    result.forEach((item) => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    res.json({
      income,
      expense,
      balance: income - expense
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryBreakdown = async (req, res, next) => {
  try {
    const match = {
      ...buildScopeMatch(req),
      ...buildDateMatch(req)
    };

    const pipeline = [];
    if (Object.keys(match).length) pipeline.push({ $match: match });

    const data = await Transaction.aggregate([
      ...pipeline,
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getTrends = async (req, res, next) => {
  try {
    const { interval } = req.query;

    const match = {
      ...buildScopeMatch(req),
      ...buildDateMatch(req)
    };

    const pipeline = [];
    if (Object.keys(match).length) pipeline.push({ $match: match });

    const groupId =
      interval === "week"
        ? { year: { $isoWeekYear: "$date" }, week: { $isoWeek: "$date" } }
        : { year: { $year: "$date" }, month: { $month: "$date" } };

    const data = await Transaction.aggregate([
      ...pipeline,
      {
        $group: {
          _id: groupId,
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getRecent = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const filter = req.user.role === "admin" ? {} : { userId: req.user.id };

    const txs = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(txs);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getTrends,
  getRecent
};
