const { port } = require("./config"),
  exp = require("express"),
  { text, json } = require("body-parser"),
  cors = require("cors"),
  main = require("./routes/main"),
  esp = require("./routes/esp"),
  path = require("path"),
  compression = require("compression"),
  app = exp(),
  statPathStr = "../../docs".split("/"),
  statPath = path.join(__dirname, ...statPathStr),
  stat = exp.static(statPath);

app.use(compression(), cors(), text(), json(), stat);
app.use("/", main);
app.use("/esp", esp);

app.listen(port);
