require("dotenv").config({ path: "../.env" });
const { ENV_URL, ENV_AUTH_KEY } = process.env,
  { readFile } = require("fs"),
  { createRequest, promisify, l } = require("../src/utils"),
  headers = {
    "Content-Type": "application/json",
    Accept: "application/vnd.heroku+json; version=3",
    Authorization: ENV_AUTH_KEY
  };

const req = createRequest({
  baseURL: ENV_URL,
  headers
});

const send = async () => {
  try {
    const file = await promisify(readFile)("../.env", "utf-8"),
      strings = file.split("\n").filter(data => data.trim()),
      envs = strings.reduce((acc, cur) => {
        const pair = cur.split("="),
          key = pair[0].trim(),
          value = pair[1].replace(/"/g, "").trim();

        acc[key] = key === "NODE_ENV" ? "production" : value;
        return acc;
      }, {});
    const res = await req.patch("/", envs);
    l(res);
  } catch (e) {
    l(e);
  }
};

send();
