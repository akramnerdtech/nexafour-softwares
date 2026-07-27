const express = require("express");

const {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
} = require(
  "../controllers/work.controller"
);

const router = express.Router();

router.post("/", createWork);

router.get("/", getAllWorks);

router.get("/:id", getWorkById);

router.put("/:id", updateWork);

router.delete("/:id", deleteWork);

module.exports = router;