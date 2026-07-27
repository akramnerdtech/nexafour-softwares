const express = require("express");

const {
  getHome,
  updateHome,
} = require(
  "../controllers/home.controller"
);

const router =
  express.Router();

router.get(
  "/",
  getHome
);

router.put(
  "/",
  updateHome
);

module.exports = router;