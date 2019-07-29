const isProdMode = PROD_MODE;

const baseURL = isProdMode
  ? "https://mern-web-shop.herokuapp.com"
  : "http://localhost:3000";

export { baseURL };
