const express = require("express"),
  router = express.Router(),
  { getHandler } = require("../controllers/esp"),
  erh = require("../services/erh");

router.get("/", getHandler);

module.exports = router;
