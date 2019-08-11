const E = {},
  digitalWrite = (a, b) => {};

//--------------------------------------
const http = require("http"),
  wifi = require("Wifi");

const WIFI_NAME = "RT-WiFi_038F",
  WIFI_OPTIONS = { password: "Q2vU6D3s" };

// 443 port for ssl

const l = console.log.bind(console);

let isFired = false;

const runServer = () => {
  http
    .createServer((req, res) => {
      const data = req.url.replace("/esp?", ""),
        state = data.split("=")[1];
      l(data);

      if (state === "toggle") isFired = !isFired;
      digitalWrite(2, !isFired);

      res.end(isFired);
    })
    .listen(8080);
  l("Connected!");
};

E.on("init", () => {
  wifi.connect(WIFI_NAME, WIFI_OPTIONS, err => {
    if (err) l(`Connection error: ${err}`);
    runServer();
  });
});
