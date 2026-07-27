const WorkCategory = require(
    "../models/workCategory.model"
  );
  
  const createWorkCategory = async (
    req,
    res
  ) => {
    try {
      const { name } = req.body;
  
      const exists =
        await WorkCategory.findOne({
          name,
        });
  
      if (exists) {
        return res.status(400).json({
          success: false,
          message:
            "Category already exists",
        });
      }
  
      const category =
        await WorkCategory.create({
          name,
        });
  
      res.status(201).json({
        success: true,
        message:
          "Work category created successfully",
        data: category,
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const getAllWorkCategories =
    async (req, res) => {
      try {
        const categories =
          await WorkCategory.find().sort({
            createdAt: -1,
          });
  
        res.status(200).json({
          success: true,
          message: "Success",
          data: categories,
        });
      } catch (error) {
        console.error(error);
  
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getWorkCategoryById =
    async (req, res) => {
      try {
        const category =
          await WorkCategory.findById(
            req.params.id
          );
  
        if (!category) {
          return res.status(404).json({
            success: false,
            message:
              "Category not found",
          });
        }
  
        res.status(200).json({
          success: true,
          data: category,
        });
      } catch (error) {
        console.error(error);
  
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const updateWorkCategory =
    async (req, res) => {
      try {
        const category =
          await WorkCategory.findByIdAndUpdate(
            req.params.id,
            {
              name: req.body.name,
            },
            {
              new: true,
              runValidators: true,
            }
          );
  
        if (!category) {
          return res.status(404).json({
            success: false,
            message:
              "Category not found",
          });
        }
  
        res.status(200).json({
          success: true,
          message:
            "Category updated successfully",
          data: category,
        });
      } catch (error) {
        console.error(error);
  
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const deleteWorkCategory =
    async (req, res) => {
      try {
        const category =
          await WorkCategory.findByIdAndDelete(
            req.params.id
          );
  
        if (!category) {
          return res.status(404).json({
            success: false,
            message:
              "Category not found",
          });
        }
  
        res.status(200).json({
          success: true,
          message:
            "Category deleted successfully",
        });
      } catch (error) {
        console.error(error);
  
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createWorkCategory,
    getAllWorkCategories,
    getWorkCategoryById,
    updateWorkCategory,
    deleteWorkCategory,
  };