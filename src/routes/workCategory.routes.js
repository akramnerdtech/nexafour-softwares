const express = require("express");

const {
  createWorkCategory,
  getAllWorkCategories,
  getWorkCategoryById,
  updateWorkCategory,
  deleteWorkCategory,
} = require(
  "../controllers/workCategory.controller"
);

const router = express.Router();

router.post("/", createWorkCategory);

router.get("/", getAllWorkCategories);

router.get("/:id", getWorkCategoryById);

router.put("/:id", updateWorkCategory);

router.delete("/:id", deleteWorkCategory);

module.exports = router;