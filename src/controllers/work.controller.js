const Work = require("../models/work.model");
const WorkCategory = require(
  "../models/workCategory.model"
);

// CREATE WORK
const createWork = async (req, res) => {
  try {
    const {
      title,
      description,
      points,
      link,
      image,
      category,
      status,
    } = req.body;

    const categoryExists =
      await WorkCategory.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Work category not found",
      });
    }

    const work = await Work.create({
      title,
      description,
      points,
      link,
      image,
      category,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Work created successfully",
      data: work,
    });
  } catch (error) {
    console.error("CREATE WORK:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL WORKS
const getAllWorks = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};

    if (category) {
      const categoryDoc =
        await WorkCategory.findOne({
          name: category,
        });

      if (categoryDoc) {
        filter.category =
          categoryDoc._id;
      }
    }

    const works = await Work.find(filter)
      .populate("category", "name")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      message: "Success",
      data: works,
    });
  } catch (error) {
    console.error("GET WORKS:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE WORK
const getWorkById = async (
  req,
  res
) => {
  try {
    const work = await Work.findById(
      req.params.id
    ).populate("category", "name");

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    res.status(200).json({
      success: true,
      data: work,
    });
  } catch (error) {
    console.error("GET WORK:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE WORK
const updateWork = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      points,
      link,
      image,
      category,
      status,
    } = req.body;

    if (category) {
      const categoryExists =
        await WorkCategory.findById(
          category
        );

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message:
            "Work category not found",
        });
      }
    }

    const work =
      await Work.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          points,
          link,
          image,
          category,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate("category", "name");

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Work updated successfully",
      data: work,
    });
  } catch (error) {
    console.error("UPDATE WORK:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE WORK
const deleteWork = async (
  req,
  res
) => {
  try {
    const work =
      await Work.findByIdAndDelete(
        req.params.id
      );

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Work deleted successfully",
    });
  } catch (error) {
    console.error("DELETE WORK:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
};