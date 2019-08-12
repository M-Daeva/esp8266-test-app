const { createRequest, l } = require("../../utils"),
  { password: pass } = require("../config");

const timeout = 200,
  scanRange = { from: 15, to: 5 };
let addr = scanRange.from;

const detectDeviceAddr = async () => {
  const { from, to } = scanRange;
  for (let i = from; i > to; i--) {
    const baseURL = `http://192.168.0.${i}:8080`,
      request = createRequest({ baseURL, timeout });

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
    const baseURL = `http://192.168.0.${addr}:8080`,
      request = createRequest({ baseURL, timeout });

    try {
      const status = await request.get("/esp", {
        state
      });
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
