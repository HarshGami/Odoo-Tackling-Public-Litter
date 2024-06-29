const usermodel = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();

exports.get_collector_list = async (req, res) => {
  try {
    let query = {'role': 2};

    const collectorList = await usermodel.find(query);

    res.status(200).json({
      status: 'ok',
      message: 'Collector list retrieved successfully.',
      collectorList,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


