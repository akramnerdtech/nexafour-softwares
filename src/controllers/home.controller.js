const Home = require("../models/home.model");

// GET HOME
const getHome = async (req, res) => {
  try {
    let home = await Home.findOne();

    if (!home) {
      home = await Home.create({
        homeTitle: "",
        homeDescription: "",
      });
    }

    res.status(200).json({
      success: true,
      message: "Success",
      data: home,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE HOME
const updateHome = async (
  req,
  res
) => {
  try {
    let home = await Home.findOne();

    if (!home) {
      home = await Home.create(
        req.body
      );
    } else {
      Object.assign(
        home,
        req.body
      );

      await home.save();
    }

    res.status(200).json({
      success: true,
      message:
        "Home updated successfully",
      data: home,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getHome,
  updateHome,
};