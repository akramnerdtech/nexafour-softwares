const Industry = require(
    "../models/industry.model"
  );
  
  // CREATE
  const createIndustry = async (
    req,
    res
  ) => {
    try {
      const {
        icon,
        title,
        description,
      } = req.body;
  
      const exists =
        await Industry.findOne({
          title,
        });
  
      if (exists) {
        return res.status(400).json({
          success: false,
          message:
            "Industry already exists",
        });
      }
  
      const industry =
        await Industry.create({
          icon,
          title,
          description,
        });
  
      res.status(201).json({
        success: true,
        message:
          "Industry created successfully",
        data: industry,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // GET ALL
  const getAllIndustries =
    async (req, res) => {
      try {
        const industries =
          await Industry.find().sort({
            createdAt: -1,
          });
  
        res.status(200).json({
          success: true,
          message: "Success",
          data: industries,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // GET SINGLE
  const getIndustryById =
    async (req, res) => {
      try {
        const industry =
          await Industry.findById(
            req.params.id
          );
  
        if (!industry) {
          return res.status(404).json({
            success: false,
            message:
              "Industry not found",
          });
        }
  
        res.status(200).json({
          success: true,
          data: industry,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // UPDATE
  const updateIndustry =
    async (req, res) => {
      try {
        const industry =
          await Industry.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          );
  
        if (!industry) {
          return res.status(404).json({
            success: false,
            message:
              "Industry not found",
          });
        }
  
        res.status(200).json({
          success: true,
          message:
            "Industry updated successfully",
          data: industry,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // DELETE
  const deleteIndustry =
    async (req, res) => {
      try {
        const industry =
          await Industry.findByIdAndDelete(
            req.params.id
          );
  
        if (!industry) {
          return res.status(404).json({
            success: false,
            message:
              "Industry not found",
          });
        }
  
        res.status(200).json({
          success: true,
          message:
            "Industry deleted successfully",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createIndustry,
    getAllIndustries,
    getIndustryById,
    updateIndustry,
    deleteIndustry,
  };