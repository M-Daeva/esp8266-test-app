const { createRequest, l } = require("../../utils"),
  { password: pass } = require("../config");

const getBaseURL = (data) => `http://192.168.88.${data}:8080`;

const timeout = 200,
  scanRange = { from: 255, to: 240 };

let addr = scanRange.from;

const detectDeviceAddr = async () => {
  const { from, to } = scanRange;
  for (let i = from; i > to; i--) {
    const request = createRequest({ baseURL: getBaseURL(i), timeout });

    try {
      await request.get("/esp", {});
      addr = i;
      break;
    } catch (e) {
      l(`${e.message} at ${e.config.url}`);
    }
  }

  return addr;
};

const getHandler = async (req, res) => {
  const { state, password, init } = req.query;

  const getStatus = async () => {
    const request = createRequest({ baseURL: getBaseURL(addr), timeout });

    try {
      const status = await request.get("/esp", { state });
      res.send({ status });
    } catch (e) {
      addr = await detectDeviceAddr();
      res.send(e.message);
    }
  };

  if (init !== undefined) {
    addr = await detectDeviceAddr();
    res.send("initialized");
  } else {
    if (state === undefined) {
      if (password === pass || password === undefined) await getStatus();
      else res.send({});
    } else await getStatus();
  }
};

module.exports = { getHandler };
