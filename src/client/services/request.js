import axios from "axios";
import { baseURL } from "../config";

const createRequest = config => {
  const ax = axios.create(config);

  class Request {
    get = async (url, config) => (await ax.get(url, config)).data;
    post = async (url, data, config) => (await ax.post(url, data, config)).data;
    put = async (url, data, config) => (await ax.put(url, data, config)).data;
  }

  return new Request();
};

const req = createRequest({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

export { axios, req, createRequest };
