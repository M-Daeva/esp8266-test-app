const { createRequest, l } = require("../../utils");

const baseURL = "http://192.168.0.11:8080";
const request = createRequest({ baseURL });

const getHandler = async (req, res) => {
  const { state } = req.query;

  try {
    const status = await request.get("/esp", {
      state
    });
    res.send(status);
  } catch (e) {
    res.send(e);
  }
};

module.exports = { getHandler };
