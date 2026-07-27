const express = require("express");

const {
  createIndustry,
  getAllIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
} = require(
  "../controllers/industry.controller"
);

const router = express.Router();

router.post(
  "/",
  createIndustry
);

router.get(
  "/",
  getAllIndustries
);

router.get(
  "/:id",
  getIndustryById
);

router.put(
  "/:id",
  updateIndustry
);

router.delete(
  "/:id",
  deleteIndustry
);

module.exports = router;