const { createRequest, l } = require("../../utils");

const baseURL = "http://192.168.0.13:8080";
const request = createRequest({ baseURL });

let st = false;

const getHandler = async (req, res) => {
  const { state } = req.query;

  // let status = false;
  // try {
  //   status = await request.get("/esp", {
  //     state
  //   });
  // } catch (e) {
  //   l(e);
  // }
  st = !st;
  res.send(st);
};

module.exports = { getHandler };
