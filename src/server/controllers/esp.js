const { createRequest, l } = require("../../utils");

const baseURL = "http://192.168.0.13:8080";
const request = createRequest({ baseURL });

const getHandler = async (req, res) => {
  const { state } = req.query;

  const status = await request.get("/esp", {
    state
  });
  // const status = await request.get("/esp", {
  //   state,
  //   other: JSON.stringify([1, 3])
  // });

  res.send(status);
};

module.exports = { getHandler };
