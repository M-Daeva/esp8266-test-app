require("dotenv").config({ path: "../.env" });

const p = process.env;

module.exports = {
  port: p.PORT || p.PORT2,
  baseUrl: p.BASE_URL,
  referer: p.REFERER,
  host: p.HOST,
  referer2: p.REFERER2,
  host2: p.HOST2,
  password: p.PASSWORD
};
