import { connectToStore } from "../state";

const connect = obj => {
  const entries = Object.entries(obj);
  return entries.reduce((acc, cur) => {
    const [key, value] = cur,
      newKey = key.slice(1);
    acc[newKey] = connectToStore(value);
    return acc;
  }, {});
};

import App from "./app";
import $Main from "./main";

const { Main } = connect({
  $Main
});

export { App as default, Main };
