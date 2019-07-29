const path = require("path");

const getHandler = (req, res) => {
  const str = "../../../docs/index.html".split("/"),
    rp = path.join(__dirname, ...str);
  res.sendFile(rp);
};

module.exports = { getHandler };
