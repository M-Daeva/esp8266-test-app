const axios = require("axios");

const l = console.log.bind(console);

const promisify = (fn, obj = null, key) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.call(obj, ...args, (err, data) => {
        const res = key ? data[key] : data;
        err ? reject(err) : resolve(res);
      });
    });
  };
};

const createRequest = config => {
  const req = axios.create(config);

  class Request {
    get = async (url, params, config) =>
      (await req.get(url, { params }, config)).data;
    post = async (url, params, config) =>
      (await req.post(url, params, config)).data;
    put = async (url, params, config) =>
      (await req.put(url, params, config)).data;
    patch = async (url, params, config) =>
      (await req.patch(url, params, config)).data;
  }

  return new Request();
};

const getID = () => Date.now() + "" + Math.random();

// nested object immutable update function
const imup = (tree, entry) => {
  const [name] = Object.keys(entry);
  let temp,
    isFound = false;

  const loop = obj => {
    for (let key in obj) {
      if (key === name) {
        [temp, isFound] = [entry, true];
        break;
      }

      const value = obj[key];
      if (value.constructor === Object) {
        loop(value);
        if (isFound) {
          temp = { [key]: { ...value, ...temp } };
          break;
        }
      }
    }
  };

  loop(tree);

  return { ...tree, ...temp };
};

const getByID = (arr, id, prop) => {
  const elem = arr.find(({ id: _id }) => _id === id);
  if (prop === undefined) return elem;
  const [key, value] = Object.entries(prop)[0];
  return elem ? elem[key] : value;
};

const getByEntry = (arr, entry) => {
  const [[key, value]] = Object.entries(entry);
  const elem = arr.find(({ [key]: _value }) => _value === value);
  return elem;
};

const logTime = text => {
  l(text, Date.now() % 10000);
};

// replaces found by entry element of array by this element, merged with new element
const imupar = (arr, newItem, entry, isClean = true) => {
  const [[key, value]] = Object.entries(entry),
    targetItem = getByEntry(arr, entry);

  if (!targetItem) arr = [...arr, { ...newItem, [key]: value }];
  else
    arr = arr.map(item => {
      item = isClean ? item : clearItem(item);
      return item[key] == value ? { ...item, ...newItem } : item;
    });

  return arr;
};

const imfi = (arr, entry) => {
  const [[key, value]] = Object.entries(entry);
  return arr.filter(item => item[key] !== value);
};

const clearItem = item => JSON.parse(JSON.stringify(item));

const mergeCarts = (preCart, curCart) => {
  preCart.map(preItem => {
    const { id: preId, quantity: preQuantity } = preItem,
      isFound = getByEntry(curCart, { id: preId });

    if (!isFound) curCart.push(preItem);
    else {
      curCart = curCart.map(curItem => {
        const { id: curId, quantity: curQuantity } = curItem;

        if (curId === preId) {
          curItem.quantity = `${+curQuantity + +preQuantity}`;
        }
        return curItem;
      });
    }
  });

  return curCart;
};

module.exports = {
  l,
  promisify,
  createRequest,
  getID,
  imup,
  getByID,
  logTime,
  getByEntry,
  imupar,
  clearItem,
  imfi,
  mergeCarts
};
