const express = require("express"),
  router = express.Router(),
  { getHandler } = require("../controllers/main"),
  erh = require("../services/erh");

router.get("/", erh(getHandler));

module.exports = router;
