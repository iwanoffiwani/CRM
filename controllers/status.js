const Status = require("../models/Status");
const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  try {
    const statuses = await Status.find({});

    return res.status(200).json(statuses);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const status = await new Status({
      name: req.body.name,
      color: req.body.color
    }).save();

    return res.status(201).json(status);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    await Status.deleteOne({ _id: req.query.id });

    await Order.updateMany(
      {
        "status._id": req.query.id
      },
      {
        $set: {
          status: {
            name: ""
          }
        }
      },
      {
        isDeleted: true
      }
    );

    return res.status(200).json({ message: `Категория удалена` });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    await Status.findOneAndUpdate(
      {
        _id: req.query.id
      },
      {
        $set: {
          name: req.body.name
        }
      },
      {
        new: true
      }
    );

    await Order.updateMany(
      {
        "status._id": req.query.id
      },
      {
        $set: {
          "status.name": req.body.name
        }
      },
      {
        isDeleted: true
      }
    );

    return res.status(200).json({ message: "Статус успешно обновлен" });
  } catch (e) {
    errorHandler(res, e);
  }
};
